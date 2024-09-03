'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//Receives an array of movements and displays that data
const displayMovements = function(movements){
  movements.forEach(function(mov, i){
    
  })
}

displayMovements(account1.movements)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
*/
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//146. forEach with maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//Using map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Using set
const curreciesUnique = new Set(['USD', 'COP', 'USD', 'EUR', 'ARG']);
console.log(curreciesUnique);
curreciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${_}`); //the second parameter is the same of the first one
});

/////////////////////////////////////////////////
//145. Looping Arrays: forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements){
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You made a deposit of ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrawn ${Math.abs(movement)}`); //Math.abs() removes the sign of a number
  }
}

console.log('----FOREACH------');
//In a forEach loop is not possible to use the CONTINUE and BREAK method
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You made a deposit of ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrawn ${Math.abs(mov)}`); //Math.abs() removes the sign of a number
  }
});
*/
/////////////////////////////////////////////////
//144. The new at method
/*
const arr = [11, 4, 21]
console.log(arr[0]); //print the element in position 0
console.log(arr.at(0)); //print the element in position 0

//Getting the last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
//Also works on strings
console.log('Camilo'.at(0)); //Returns the letter in possition 0
*/

/////////////////////////////////////////////////
//143. Simple Array Methods
//Remember --> A METHOD is just a FUNCTION attached to an object
/*
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

//SLICE
console.log(arr.slice(2)); //return a new array ['c', 'd', 'e', 'f']
console.log(arr.slice(2, 4)); //return a new array ['c', 'd']
console.log(arr.slice(-2)); //negatives values takes the values from the end['e', 'f']
console.log(arr.slice(1, -2)); //returns ['b', 'c', 'd']
console.log(arr.slice()); //shallow copy of the array
console.log([...arr]); //shallow copy of the array

//SPLICE --> Change the original array
//console.log(arr.splice(2)); //returns ['c', 'd', 'e', 'f']
arr.splice(-1);
console.log(arr); //returns arr withouth the final value
arr.splice(1, 3); // deletes from position 1, counting 3
console.log(arr); //Returns ['a', 'e']

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e', 'f'];
let arr2 = ['z', 'y', 'x'];
arr2.reverse();
console.log(arr2); //Returns the MUTATED array in order

//CONCAT
let letters = arr.concat(arr2);
console.log(letters);

console.log(...arr, ...arr2); // concatenate the two arrays

//JOIN
console.log(arr.join(' * ')); //Returns an string with the elements of the array separate it by the specify character
*/
