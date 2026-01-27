class Dog {

    constructor (breed,color){
    this.breed = breed;
    this.color = color;
}



bark(){
    console.log(`${this.breed} ${this.color} is barking...`);   
}
}

const myDog = new Dog("Husky", "Black")
myDog.bark();











