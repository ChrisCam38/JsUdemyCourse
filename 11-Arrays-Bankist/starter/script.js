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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
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

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  //every movement needs to be greater or equal of 10% of the amount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

//Close functionality
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);

    //Delete the account
    accounts.splice(index, 1);

    //Hide the UI
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
//168. CHALLENGE # 4

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Add the recommended food property (recommendedFood)

dogs.forEach(dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))); //Math.trunc to remove the decimal part

console.log(dogs);

//2. Finding Sara's dog

const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));

sarahsDog.curFood > sarahsDog.recommendedFood * 1.1
  ? console.log('Saras dog is eating to much')
  : sarahsDog.curFood > sarahsDog.recommendedFood * 0.9
  ? console.log('Saras dog is eating too little')
  : console.log('The dog is eating correctly');

console.log(sarahsDog);

//3.

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap(ow => ow.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap(ow => ow.owners);
console.log(ownersEatTooLittle);

//4.
console.log(ownersEatTooMuch);
const messageEatTooMuch =
  ownersEatTooMuch.map(ow => ow).reduce((msg, owner) => msg + ' and ' + owner) +
  `'s dogs eat too much`;

console.log(messageEatTooMuch);

const messageEatTooLittle =
  ownersEatTooLittle
    .map(ow => ow)
    .reduce((msg, owner) => msg + ' and ' + owner) + `'s dogs eat too little`;

console.log(messageEatTooLittle);

//5.
const eatingExact = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(eatingExact);

//6.
const eatingOk = dogs.some(
  dog =>
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
);
console.log(eatingOk);

//7.
const dogsEatingOk = dogs.filter(
  dog =>
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
);

console.log(dogsEatingOk);

//7.
console.log(dogs);

const dogsSorted = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);


/* REPASAR
function reducer(accumulator, currentValue, index) {
  const returns = accumulator + ' and ' + currentValue;

  return returns;
}

console.log(`${ownersEatTooMuch.reduce(reducer)}'s dogs eat to much`);
*/

/////////////////////////////////////////////////
//167. Array methods practice
/*
//Exercise 1
//const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((ac, mov) => ac + mov, 0);

console.log(bankDepositSum);

//Exercise 2
//Counting how many deposits are above 1000

const numDepostis1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, dep) => (dep >= 1000 ? count + 1 : count), 0);

console.log(numDepostis1000);

//Exercise 3
//Creating a object using reduce
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; //using brackets notation intead of dot notation
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

//Exercise 4
//Converting a string into a title case
//example: this is a nice title --> This Is a Nice Title

const convertTitleCase = function(title){
  const capitalize = str => str[0].toUpperCase() + str.slice(1); 
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'in', 'and', 'with'];
  

  const titleCase = title
  .toLocaleLowerCase()
  .split(' ')
  .map(word => exceptions.includes(word) ? word : capitalize(word))
  .join(' ');
  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title'));
console.log(convertTitleCase('and here is another title EXAMPLE'));

*/

/////////////////////////////////////////////////
//165. Sorting arrays
/*
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7); //If you pass only one value, creates an array with 7 empty positions
console.log(x);
console.log(x.map(() => 5)); //Is not possible to use the map method to fill the array

//However, we can use the fill method
//x.fill(1); //Returns [1, 1, 1, 1, 1, 1, 1]

x.fill(1, 2); //fill(valueToInsert, startPosition, endPosition)
console.log(x);

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//Random number from 1 to 6
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
//Array with 100 rolldice
const rollDice = Array.from({ length: 100 }, () => getRandomInt(1, 7));
console.log(rollDice);

//REMEMBER: querySelectorAll returns a nodeList that has a structure similar to an array

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI);
});
*/
/////////////////////////////////////////////////
//164. Sorting arrays
/*
//IMPORTANT: the sort method mutates the array
//Strings
const owners = ['Juan', 'Pedro', 'Camilo', 'Esteban', 'Miguel'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);

//Return < 0, A, B
//Return > 0, B, A

//Ascending

// movements.sort((a, b)=> {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);

//The same but more concise
movements.sort((a, b) => a - b); 
console.log(movements);
//Descending
// movements.sort((a, b) =>{
//   if (a > b) return -1;
//   if (b > a) return 1;
// })
//The same but more concise
movements.sort((a, b) => b - a); 
console.log(movements);
*/

/////////////////////////////////////////////////
//163. flat and flatMap
/*
const arr = [1, [2, 3, 4], 5, [6, 7], 8]; //array that contains arrays
console.log(arr.flat()); //Turning all into a big array

const arrDep = [1, [2, [3, 4], 8], 5, [6, 7], 8, [9, [10, 11], 13], 15];
console.log(arrDep.flat(2));
*/
/*
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); // Array with all movements in each account

const allMovements = accountMovements.flat();
console.log(allMovements);

const totalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(totalBalance);
*/
//The same of above but more consice
//flat
/*
const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);

//flatMap -> method that combines flat and map
const accountMovements2 = accounts
  .flatMap(acc => acc.movements) //Only goes one level deep it cant be change it
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);
*/
/////////////////////////////////////////////////
//162. Some and every
/*
console.log(movements);
//Verifies if a specific value exists in an array - Checks  for EQUALITY
console.log(movements.includes(70));
//Checks a condition

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); //Returns true

//EVERY
//Checks if all the elements in an array are positives
console.log(account4.movements.every(mov => mov > 0));

//Separate callback
const deposit = mov => mov > 0; //The condition
//Same condition, different methods
console.log(movements.every(deposit));
console.log(movements.some(deposit));
*/
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
