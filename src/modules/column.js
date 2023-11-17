

// класс создания колонки заправочной
export class Column {
  // автомобиль у колонки
  #car = null;

  constructor(type, speed = 5) {
    // тип заправки
    this.type = type;
    // скорость заправки
    this.speed = speed;
  }

  set car(car) {
    this.#car = car;
  }

  get car() {
    return this.#car;
  }
}
