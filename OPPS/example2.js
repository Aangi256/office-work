class Car {

    constructor(carname,carcolor){
    this.carname = carname;
    this.carcolor = carcolor;
    }

  drive() {
    console.log(
      `${this.carname} with ${this.carcolor} color is driving so fast ....`,
    );
  }
}
const myCar = new Car("Mercedes", "Black");
myCar.drive();