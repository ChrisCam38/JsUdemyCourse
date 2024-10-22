'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-10-15T17:01:17.194Z',
    '2024-10-16T23:36:17.929Z',
    '2024-10-17T18:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDatesPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDatesPassed(new Date(), date);
  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    /*     const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; */
    return Intl.DateTimeFormat(locale).format(date);
  }
};

//Formamt currency function
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //Account dates array
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formatMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__dates">${displayDate}</div>
        <div class="movements__value">${formatMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formatMov = formatCurrency(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formatMov;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

//FAKE LOGIN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

//Trying Dates internationalization
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  //weekday: 'long'
};

//Getting the location and language from user browsers
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  options
).format(now);

//Desire output date: day/month/Year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0); //padStart format the date: 1/2/2024 -> 01/02/2024 | We are saying max lenth, and pad with a cero (2, 0)
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {// Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount)}, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////
//181. setTimeOut and sethInterval

//setTimeOut: used to execute some code at some point in the future
//setTimeout (callback function, time in miliseconds)
const ingrediants = ['onion', 'mushrooms'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza of ${ing1} and ${ing2}`),
  3000,
  ...ingrediants
);
if (ingrediants.includes('onion')) clearTimeout(pizzaTimer);

console.log('Waiting');

//setInterval

setInterval(function(){
  const now = new Date();
  const hours =now.getHours();
  const minutes =now.getMinutes();
  const seconds =now.getSeconds();
  console.log(`The time is: ${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`);

}, 1000)

/////////////////////////////////////////////////
//180. Internazionalization Numbers (Int)

const num = 302545.8;

const options2 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
};

console.log(
  'USA Format: ',
  new Intl.NumberFormat('en-US', options2).format(num)
);
console.log(
  'Germany Format: ',
  new Intl.NumberFormat('de-DE', options2).format(num)
);
console.log(
  'USA Format: ',
  new Intl.NumberFormat('ar-SY', options2).format(num)
);
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options2).format(num)
);

/////////////////////////////////////////////////
//179. Internazionalization API

/////////////////////////////////////////////////
//178. Operations with dates
/*
const future = new Date(2024, 10, 15, 8, 20);

console.log(+future);
console.log(Number(future)); //return timestamp



const days1 = calcDatesPassed(new Date(2024, 10, 20), new Date(2024, 10, 15));
console.log(days1);*/
//Recommended library to work with dates: Moment.JS

/////////////////////////////////////////////////
//176. Creating Dates

//Creating a date
//There are 4 ways to creates dates in JS
//All of them use the constructor function but can accept different parameters
/*
const now = new Date();
console.log(now); //Output: current date

console.log(new Date('Oct 11 2016 18:39:29'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 15, 8, 20, 15));

console.log(new Date(2037, 10, 31)); //November only got 30 day --> Output: December 1

console.log(new Date(0)); //Output: January 1 1970

console.log(new Date(3 * 24 * 60 * 60 * 1000)); //Output: Sat Jan 03 1970 19:00:00 GMT-0500 (Colombia Standard Time) (three days later)

//Working with dates
const future = new Date(2024, 10, 15, 8, 20);
console.log(future);

console.log(future.getFullYear()); //Output: 2037 (never use .getYear())

console.log(future.getMonth()); //Output: 10
console.log(future.getDate()); //Output: 15
console.log(future.getDay()); //Output: 5 -- Day of the month
console.log(future.getHours()); //Output: 8
console.log(future.getMinutes()); //Output: 20
console.log(future.getSeconds()); //Output: 0
console.log(future.toISOString()); //Output: 2024-11-15T13:20:00.000Z
console.log(future.getTime()); //Output: 1731676800000 -> Amount of time that has happen since Jan 01 1970

console.log(new Date(1731676800000));

future.setFullYear(2040);
console.log(future); //Output: Thu Nov 15 2040 08:20:00 GMT-0500 (Colombia Standard Time)
*/

/////////////////////////////////////////////////
//175. Working with BigInt
/*
//In JS there is a maximum value for integer
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER); //Is also stored in the Number object by default

//To use number bigger than that BigInt was introduced
console.log(564545444444444454545848496584n); //Is necessary to put a n at the end of the number

console.log(BigInt(4654198494));

//Operations with BigInts

console.log(10000n + 10000n);
console.log(654694984984984949n * 251658n);

const huge = 5464646984984948n;
const num = 45;

//console.log(num * huge); //Error
console.log(BigInt(num) * huge); //Is necessary to use the constructor to convert the regular integer into a BigInt

//Exceptions
console.log(25n > 10); //Output: true
console.log(20n === 20); //Output: false
console.log(20n == 20); //Output: true

console.log(huge + ' is really big');

//Divisions
console.log(11n / 3n); //Output: 3n
console.log(10 / 3); //Output: 3.3333...
*/
/////////////////////////////////////////////////
//174. Numeric separators
/*
//Are used to format number is a way that is easy for us to understand

//287,460,000,000
const diameter = 287_460_000_000; //Using urderscores to format the number
console.log(diameter); //It doesn't affect the output

const priceCent = 33_52;
console.log();

//The same amount of number, two different meanings
const price1 = 15_00;
const price2 = 1_500;

console.log(Number('23_000')); //Output: NaN
*/

/////////////////////////////////////////////////
//173. The remainder operator
/*
console.log(5 % 2); //Output: 1
console.log(5 / 2); //Output: 2.5 - 5 = (2 * 2) + 1

console.log(8 / 3); //Output: 2.5 - 8 = (3 * 2) + 2

//REMEMBER: An EVEN NUMBER is when the reminder of the division by 2 is equal to zero
console.log(6 % 2); //Output: 0

const isEven = num =>
  num % 2 === 0 ? console.log(`${num} is even`) : console.log(`${num} is odd`);

isEven(8);

isEven(15);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0, 2, 4, 6, 8, 10
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

*/

/////////////////////////////////////////////////
//172. Math and rounding
/*
console.log(Math.sqrt(25)); //Return 5
console.log(25 ** (1 / 2)); //Square root of 25 = 5
console.log(8 ** (1 / 3)); //Cube root of 8 = 2

console.log(Math.max(5, 8, 9, 15, 20)); //Return max
console.log(Math.max(5, 8, 9, '15', 20)); //Return max
console.log(Math.max(5, 8, 9, '15as', 20)); //Return NaN

//The Math namespace also have constants
console.log(Math.PI * Number.parseFloat('20px') ** 2);

//Math.random
console.log(Math.random()); //Return random numbers between 0 - 1

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
console.log(randomInt(1, 8));

//Rounding integers
console.log(Math.round(23.3)); //Return 23
console.log(Math.round(23.9)); //Return 24

console.log(Math.ceil(23.3)); //Round up to 24
console.log(Math.ceil(23.9)); //Round up to 24

console.log(Math.floor(23.3)); //Round down to 23
console.log(Math.floor(23.9)); //Round down to 23

console.log(Math.trunc(23.3)); //Return 23 removes the decimal part

//Comparing trunc vs floor
console.log(Math.floor(-23.3)); //Round down to -24
console.log(Math.trunc(-23.3)); //Return -23

//Rounding decimals
//toFixed always returns a string and NOT A NUMBER!!
console.log((2.7).toFixed()); //Return 3 --> as string
console.log((2.7).toFixed(3)); //Return 2.700 --> 3 decimal positions
console.log((2.4545).toFixed(2)); //Return 2.45 --> 2 decimal positions
console.log(+(2.345).toFixed(2)); //Return 2.35 --> 2 decimal positions
*/

/////////////////////////////////////////////////
//171. Converting and checking numbers
/*
console.log(23 === 23.0); //Return true

console.log(0.1 + 0.2); //Return 0.30000000004

//CONVERSION
//To convert a string into a number just add a plus sign before the string
console.log(+'23');
console.log(Number('23'));

//PARSING
console.log(Number.parseInt('30px')); //Return 30 as a number
console.log(Number.parseInt('e26')); //Doesn't work - the number need to be first

console.log(Number.parseFloat('  2.5rem')); //Return 2.5
console.log(Number.parseInt('  2.1')); //Return 2

console.log(Number.isNaN(23)); //Return false
console.log(Number.isNaN('23')); //Return false
console.log(Number.isNaN(+'23x')); //Return true
console.log(Number.isNaN(5 / 0)); //Return false

//Checking if a value is a real number

console.log(Number.isFinite(20)); //Return true
console.log(Number.isFinite('20')); //Return false
console.log(Number.isFinite(5 / 0)); //Return false
*/
