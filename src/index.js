// import './style.css';
import { Truck, PassangerCar } from './modules/car.js';
import { Station } from './modules/station.js';


const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
    ['Lada', 'Vesta', 90, 'gaz'],
    ['GAZ', 'Next', 100, 'gaz'],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
};

const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passangerCar : testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return typeBool ? new PassangerCar(...randomCar) : new Truck(...randomCar);
};

const station = new Station([
  {
    // тип колонки
    type: 'petrol',
    // сколько колонок
    count: 3,
    // скорость заправки
    speed: 5,
  },
  {
    type: 'diesel',
    count: 2,
    speed: 20,
  },
  {
    type: 'gaz',
    count: 1,
    speed: 10,
  },

  // класс куда рендерим
], '.app');

open.addEventListener('click', () => {
  // создаем станцию
  station.init();
  console.log(station);
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    // добавить авто в очередь
    station.addCarQueue(getTestCar());
  });
});


