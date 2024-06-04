'use strict';

/////////////////////////////////////////////////////
//131. First class and higher order functions

//First class functions

/*
  -JS treats functions as first-class citizens
  -Functions are just values
  -Functions are just another type of object


  With function we can:
  -Store functions in variables or properties
  -pass functions as arguments of other functions
  -Return functions from functions
  -Call methods on functions

*/

//Higher order functions

/*
1. Is a funtions that RECEIVES a function as an argument,
that returns a new functions or BOTH

Example: 
          const greet = () => console.log('Hey Jonas');
          btnClose addEventListener ('click', greet); //greet is the callback function (functions pass as a argument)


This is only possible because of first class functions

*/

/////////////////////////////////////////////////////
//130. How to passing arguments? Values vs reference
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
//Prints 'LH234' the same value contain in the flight variable
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
const bookings = [];

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
*/
