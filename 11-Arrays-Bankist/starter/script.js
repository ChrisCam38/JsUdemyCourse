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
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    //Using a ternary operator to identify wheter is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov} €</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html); //Method that add the HTML in the container Movements
  });
};

const CalcDisplaySummary = function (acc) {
  //Calculated the income of the account
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  //Calculated outcomes of bank
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`; //Math.abs() -> removes the sign

  //Calculted interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((intr, i, arr) => {
      return intr >= 1;
      console.log(arr);
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = interest;
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const createUserNames = function (accs) {
  //receives an array with accounts
  //Remember: For each mutates the data from an array -> in this case, the accounts array
  accs.forEach(function (accs) {
    accs.userName = accs.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name.substring(0, 1))
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balace
  calcDisplayBalance(acc);
  //Display summary
  CalcDisplaySummary(acc);
};

let currentAccount;
//Login logic
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  //Returns account object
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  //Using optional chainig "?" to prevent errors when looking for account that doesn't exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
  }

  containerApp.style.opacity = 100;

  //Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  //Update UI
  updateUI(currentAccount);
});

//Btn transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  //Clean the transfer values in the form
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

//Close functionality
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  

  if(currentAccount.userName === inputCloseUsername.value && Number(inputClosePin.value) === currentAccount.pin){
    
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
    console.log(index);

    //Delete the account
    accounts.splice(index, 1);

    //Hide the UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = '';
})





/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//158. The find method
//Find returns an element  -- the filter method returns an array
/*
const firstWithdrawal = movements.find(mov => mov < 0); //Returns the first withdrawal
console.log(movements);
console.log(firstWithdrawal);

//Array with accounts
console.log(accounts);

//Finding one account user
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); //Retrieves an object
*/
/////////////////////////////////////////////////
//157. Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge(ages1));
console.log(calcAverageHumanAge(ages2));
*/
/////////////////////////////////////////////////
//156. The magic of chaining methods
/*
const euroToUsd = 1.1;
const result = movements
  .filter(mov => mov > 0)
  .map(mov => euroToUsd * mov)
  .reduce((acc, mov) => acc + mov, 0);

console.log(result);
*/
/////////////////////////////////////////////////
//155. Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const human = ages.map(function (dogAge) {
    if (dogAge <= 2) return 2 * dogAge;
    else return (16 + dogAge) * 4;
  });
  console.log(human);

  //Less than 18 human years
  const aboveEigthteen = human.filter(function (humanAge) {
    return humanAge > 18;
  });
  console.log(aboveEigthteen);

  //Calculated average
  const averageAge =
    human.reduce((sumAge, age) => (sumAge += age)) / human.length;
  console.log(averageAge);
  console.log(human.length);
};

calcAverageHumanAge(ages1);
calcAverageHumanAge(ages2);
//if (dogAge <= 2)
//  return humanAge = 2 * dogAge;
//else
// return humanAge = (16 + dogAge) * 4
*/
/////////////////////////////////////////////////
//154. The reduce method

//In the reduce method the callback function receives 4 parameter:
//1. The accumulator
//2. The current value of the array
//3. The value position
//4. The array with all elements

//Using normal fucntions
//const balance = movements.reduce(function(acc, curr, i, arr){ //in the reduce method the first parameter is called "accumulator"
//  console.log(`Iteration: ${i} accumulator is: ${acc}`);
//  return acc + curr;
//}, 0);
/*
//Using arrow functions
const balance = movements.reduce((acc, mov) => acc + mov);

console.log(balance);

//With a for of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;

console.log(balance2);

//Maximum value of an array
const maxValue = movements.reduce(function (max, curr) {
  if (max > curr) return max;
  else return curr;
}, movements[0]); //always use the position [0] in the array to find the maximum or the minimum value in an array

console.log(maxValue);
*/
/////////////////////////////////////////////////
//153. The filter method
/*
//Is used for filter elements that satisfied a certain condition

const deposits = movements.filter(function(mov){
  return mov > 0; //Movements returns a boolean value -> the true values will be include it
})

console.log(deposits);

//Doing the same with a for of loop

let depositsFor = [];
for (const mov of movements) if (mov > 0){
  depositsFor.push(mov);
} 

console.log(depositsFor);

const withdrawals = movements.filter(function(mov){
  return mov < 0;
})

console.log(withdrawals);

*/

/////////////////////////////////////////////////
//152. The map method
/*
const createUserNames = function (accs) {
  //receives an array with accounts
  //Remember: For each mutates the data from an array -> in this case, the accounts array
  accs.forEach(function (accs) {
    accs.userName = accs.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name.substring(0, 1))
      .join('');
  });
};

const user = 'Steven Thomas Williams';
//splits creates an array with names -> .map to iterate throught each name -> returning the first letter of each name -> joining the values in a single string

createUserNames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
//151. The map method
//Is another way to loop through an array, returns a new array
/*

const euroToUsd = 1.1;
//Using arrow functions
const movementsUSD = movements.map((mov)=> mov * euroToUsd
  //is an arrow function with one line, the return keyword is not need it
  //function(mov){
  //return mov * euroToUsd;
)

//With traditional functions
//const movementsUSD = movements.map(function(mov){
  //return mov * euroToUsd;
//})

console.log(movements);
console.log(movementsUSD);

const movementUSDfor = [];
for(const mov of movements) movementUSDfor.push(mov * euroToUsd);
console.log(movementUSDfor);

//With maps we have access to the same three parameter as in the foreach
const movementsDescriptions = movements.maps((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You made a deposit of ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrawn ${Math.abs(mov)}`; //Math.abs() removes the sign of a number
  }
}

console.log(movementsDescriptions);

*/

/////////////////////////////////////////////////
//150. Data transformations: map, filter, reduce

//MAP
/* Returns a new array containing the results of applying an
operation on all original array methods*/

//FILTER
/*Retuns an array containing the array elements that  passed
a specified test condition */

//REDUCE

/*Reduce all the elements of an array into one element (eg: adding all the elements in the array) */

///////////////////////////////////////
// 149. Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let dogsJuliaProper = dogsJulia.slice(1, -2);
  console.log(dogsJuliaProper);
  let allDogs = dogsJuliaProper.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (dogAge, i, arr) {
    dogAge >= 3
      ? console.log(
          `Dog number ${i + 1} is an adult and is ${dogAge} years old `
        )
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDogs(dogsJulia, dogsKate);
*/
/////////////////////////////////////////////////
//146. forEach with maps and sets
/*
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
*/
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
