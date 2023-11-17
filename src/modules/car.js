// создаие класса
export class Car {
  // скрытое свойство
  #maxTank;
  constructor(brand, model, maxTank) {
    // данные инкапсуляции
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }
  // методы инкапсуляции

  // возвращает название и модель
  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  // меняет модель
  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }
  // методы инкапсуляции
  fillUp() {
    this.nowTank = this.#maxTank;
    // для цепочек вызовов возвращаем объект
    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }

  set maxTank(data) {
    console.log(`Нельзя поменять значение на ${data}`);
  }

  static string = 'Новый авомобиль ';

  static logger(str) {
    console.log(str);
  }

  // статический метод
  static from({brand, model, maxTank}) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
}

// наследование
export class PassangerCar extends Car {
  typeCar = 'passanger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

export class Truck extends Car {
  typeCar = 'truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}
