'use strict';

/////////////////////////////////////////////////////
//138. Closures

/*
  A function has access to the variable environment (VE) of the execution context in which it was created

  Clousure: VE attached to the function, exactly as it was at the time and place the function was created
*/

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

//The booker function is in the global scope
//But this function born by calling secureBooking(), and thats
//why booker function has access or remenber the passengerCount variable
//because, a function remembers the variables were the function born

booker();
booker();
booker();

/*
  A clouse gives a functions access to all variables of its parents function, even after that parent function has returned. The functions keeps a reference to its outer scope, which preserves the scope chain, trhought time.
*/

/////////////////////////////////////////////////////
//137. Immediately Invoked Function Expression (IIFE)

/* 
    Functions that is only execute once, and desapear after used
*/
/*
//Normal function:
const runOonce = function (){
  console.log('This will never run again');

}
runOonce(); //calling the functions

//IIFE

(function(){  //Grapping the function into parentheses
  console.log('This will never run again');
})();  //adding () at the end to invoke the function

//IIFE arrow function

(()=>console.log('This also will never run again'))();
*/

/////////////////////////////////////////////////////
//136. CODING CHALLENGE

/////////////////////////////////////////////////////
//135. The bind method

/*
    Allow us to manually set the this keyword, the difference is that
    bind does not call the function inmediatly, instead it returns a
    NEW FUNCTION where the this keyword is bound.
*/
/*
const luthansa = {
  name: 'Luthansa',
  iataCode: 'LH',
  bookings: [],
  //book = function(){}  //old syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a flight on fligh ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ Flight: `${this.iataCode} ${flightNum}`, name });
  },
};

const book = luthansa.book;

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//book.call(eurowings, 23, 'Sara Martinez'); //.call() is a method that functions had

const bookEW = book.bind(eurowings); //creates a new function with the this keyword assign to eurowings
const bookLH = book.bind(luthansa);

bookEW(23, 'Steven Williams');

//Using PARTIAL APPLICATION --> when a part of the argument of the original function are already set
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Pedro Perez');

//With event listeners
luthansa.planes = 300;
luthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//Calling the function when making click on the button <buy plane>
document.querySelector('.buy').addEventListener('click', luthansa.buyPlane.bind(luthansa));
//Note: in an event listener the this keyword always points to the element in which it's attached

//Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addTax = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));


//Using other method - returning a function
const addTaxRate = function(rate){
  return function(value){
    return value + value * rate;
  }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/

/////////////////////////////////////////////////////
//134. The call and apply methods
/*
const luthansa = {
  name: 'Luthansa',
  iataCode: 'LH',
  bookings: [],
  //book = function(){}  //old syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a flight on fligh ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ Flight: `${this.iataCode} ${flightNum}`, name });
  },
};

luthansa.book(65456, 'Christian Tilano');

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = luthansa.book; //copy of luthansa book method --> but know is just a function --> in a regular function the this keyword poitns to undeffined

book.call(eurowings, 23, 'Sara Martinez'); //.call() is a method that functions had

console.log(eurowings);

book.call(luthansa, 299, 'Pedro Perez');
console.log(luthansa);

//Creating a new object
const swiss = {
  name: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
}

book.call(swiss, 547, 'Mary Cooper');


//Apply method --> receives an array intead of properties
//Note: it's not that used in modern Js 
const flightData = [583, 'George Gonzales'];
book.apply(swiss, flightData);
console.log(swiss);

//intead of apply we use .CALL()
book.call(swiss, ...flightData);
*/

/////////////////////////////////////////////////////
//133. Functions returning functions
/*
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet('Hey man');
greetHey('Christian');
greetHey('Carlos');

//Doing the same but in 1 line
greet('Hi!')('Lina');

//Using arrow functions to write the same code
const greet2 = greeting2 => {
  return name => {
    console.log(`${greeting2} ${name}`);
  };
};

greet2('Hello')('Mayer');

//An even more concise way of doing it
const greetArr = greetingArr => nameArr =>
  console.log(`${greetingArr} ${nameArr}`); //Arrow functions of 1 line dont need paratheses and return expression

greetArr('Hola')('Pedro');
*/

/////////////////////////////////////////////////////
//132. Functions accepting callback functions
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};



const transformer = function (str, fn) { //Higher-order function
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord); //Calling the fn with upperFirstWord as parameter

transformer('JavaScript is the best', oneWord); //Calling the fn with other functions as parameter

//Other example
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
['Lina', 'Laura', 'Camila'].forEach(high5);
// Note: Callback functions enable abstraction.
*/
/*
    By using callback functions, we can hide the specifics of a particular problem,
    allowing us to focus on more abstract and general issues. 
    This approach emphasizes the overall view of the problem, delegating specific tasks to lower-level functions.
*/

/////////////////////////////////////////////////////
//131. First class and higher order functions

//First class functions

//What is a first class  function: is just a concept
//Means that in a programming language functions are treated as values

/*
  -JS treats functions as first-class citizens
  -Functions are just values
  -Functions are just another type of object


  With functions we can:
  -Store functions in variables or properties
  -pass functions as arguments of other functions
  -Return functions from functions
  -Call methods on functions

*/

//Higher order functions --> Function that receives or return a function

/*
//1. Is a funtions that RECEIVES a function as an argument,
//that returns a new functions or BOTH

      //Example: 
                const greet = () => console.log('Hey Jonas');
                btnClose addEventListener ('click', greet); //greet is the callback function (functions pass as a argument)


      //This is only possible because of first class functions

//2. Fuction that returns new function

    //Expample:
    function count() { //count is the higher order function
      let counter = 0;
      return function(){ //this is the returned function
        counter ++;
      };
    }


*/

/////////////////////////////////////////////////////
//130. How passing arguments works? Values vs reference
/*
const flight = 'LH234';
const christian = {
  name: 'Christian Tilano',
  passport: 65449845,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 65449845) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, christian);
//Prints 'LH234' the same value contained in the flight variable
console.log(flight);
//Overwrites the value of the object, because only copies the memory reference that points to the same object -> christian
console.log(christian);

//WARNING --> when passing a object to a function keep in mind that the properties can be overwrited

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(christian);
checkIn(flight, christian);
*/

////////////////////////////////////////////////
//129. Default parameters
/*
const bookings = []; //Array with all bookings

const createBooking = function (
  //ES6 - assighning a value directly
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 - Old way of assigning values
  //numPassengers = numPassengers || 1;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // print the default values assignet
createBooking('LH123', 2, 800);
createBooking('LH123', undefined, 800); //skipping a default parameter

console.log(bookings); // Printing the array with all the objects
*/
