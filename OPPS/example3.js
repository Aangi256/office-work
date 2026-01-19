class Animal{
    constructor (name){
        this.name = name
    }

    speak(){
        console.log(`The ${this.name} makes a sound.`);
    }
}

class Dog extends Animal{
    speak(){
        console.log(`The ${this.name} barks louder`);
    }
}

const myDog = new Dog("Husky");
myDog.speak();