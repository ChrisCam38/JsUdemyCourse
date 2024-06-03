'use strict';

////////////////////////////////////////////////
//130. How to passing arguments? Values vs reference

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
