import { Column } from './column.js';
import { RenderStation } from './renderStation.js';

// класс АЗС станции
export class Station {
  // очередь
  #queue = [];
  // колонки заправки
  #filling = [];
  // кто уже заправлен
  #ready = [];
  constructor(typeStation, renderApp = null) {
    // тип станции
    this.typeStation = typeStation;
    // app с html-страницы чтобы рендерить визуал
    this.renderApp = renderApp;
    // рендер станции (по дефолту)
    this.renderStation = null;
  }

  // получить колонки
  get filling() {
    return this.#filling;
  }

  // получить очередь колонки
  get queue() {
    return this.#queue;
  }

  // паттерн инициализации конструктора класса
  init() {
    // перебираем все заправки
    this.makeFilling();

    if (this.renderApp) {
      // this здесь это станция
      this.renderStation = new RenderStation(this.renderApp, this);
    }

    // светофор для авто чтобы когда нет очереди показывал свободная колонка
    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  makeFilling() {
    for (const optionStation of this.typeStation) {
      if (optionStation.count) {
        for (let i = 0; i < optionStation.count; i++) {
          this.#filling.push(
            new Column(optionStation.type, optionStation.speed));
        }
      } else {
        for (let i = 0; i < 1; i++) {
          this.#filling.push(
            new Column(optionStation.type, optionStation.speed));
        }
      }
    }
  }

  checkQueueToFilling() {
    // если кто-то в очереди есть
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
// если у колонки заправки авто нет, и тип топлива соответствует авто в очереди
          if (!this.#filling[j].car &&
            this.#queue[i].typeFuel === this.#filling[j].type) {
            // вытащим по индексу авто
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            // заправим авто
            this.fillingGo(this.#filling[j]);
            // рендерит очередь и колонки
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;

    const timerId = setInterval(() => {
      // со скоростью заправки заправим авто
      nowTank += column.speed;
      // проверяем что топливо залито до полного бака
      if (nowTank >= car.maxTank) {
        // убиаем заправку
        clearInterval(timerId);
        // общее кол-во заправленного авто топлива
        const total = car.nowTank - needPetrol;
        // заправим до полного
        car.fillUp();
        // авто уехал из колонки
        column.car = null;
        // ппосле выезда авто
        this.leaveClient({car, total});
      }
    }, 1000);
  }

  leaveClient({car, total}) {
    this.#ready.push(car);
    this.renderStation.renderStation();
  }

  addCarQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}
