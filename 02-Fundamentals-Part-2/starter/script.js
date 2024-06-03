'use strict'; //Special mode in JavaScript to write more secure code --> it has to be the first line
// Forbid us to do certain things

//Example:
/*
let hasDriverLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
//if (passTest) hasDriversLicense = true;  -----> the variable is not write properly
//in the console nothing will apper. That is when strict mode comes in handy because
//it would tell the line

if (hasDriverLicense) console.log('I have driver license');
*/

///////////////////////////////////////////////////////////////////////////////////
//33. Functions

//Definition: piece of code that we can use in multiple occasions
/*
function logger() {
    console.log('Hi to everyone');
}

//Calling - running - invoking the function
logger();

function fruitProccesor(apple, orange) {
    const juice = `Juice with ${apple} apples and ${orange} oranges`;
    return juice;
}

const appleJuice = fruitProccesor(5, 8);
console.log(appleJuice);

Number('25') //Example of a built in function
*/

///////////////////////////////////////////////////////////////////////////////////
//34. Functions declarations vs Functions Expressions
/*
//Function declaration
const age1 = calAge1(1991); // you can call it before is declared

function calAge1(birthYear) {
    return 2037 - birthYear;
}



//Function expression
//Below is an anonymous function --> is a function without a name
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
//you can not call it before the declaration
const age2 = calcAge2(1991);

console.log(age1, age2);

//a function can be considered as a value

*/

///////////////////////////////////////////////////////////////////////////////////
//35. Arrow functions
/*
const calAge3 = birthYear => 2037 - birthYear;

const age3 = calAge3(1991);
console.log(age3);

const yearUntilRetirement = (birthYear, namePerson) => {
    const age = 2024 - birthYear;
    const retirement = 65 - age;
    return `${namePerson} retires in ${retirement} years`;
    //when are more than 2 arguments is necessary to use return
}

const example1 = yearUntilRetirement(1996, "Camilo");
console.log(example1);
*/

///////////////////////////////////////////////////////////////////////////////////
// 36. Function calling other functions
/*
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProccesor(apple, orange) {
    const applePieces = cutFruitPieces(apple);
    const orangePieces = cutFruitPieces(orange);
    const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
    return juice;
}

console.log(fruitProccesor(2, 3));
*/

///////////////////////////////////////////////////////////////////////////////////
//37. Reviewing Functions
/*
const ageCal = function (birthYear) {
    return 2037 - birthYear;
}
//Note --> when a function receives as parameter numbers is a good practice
//to return numbers
const yearUntilRetirement = function (birthYear, namePerson) {
    const age = ageCal(birthYear);
    const retirement = 65 - age;
    if (retirement > 0) {
        return `${namePerson} retires in ${retirement} years`;
        return retirement;
        return `${namePerson} retires in ${retirement} years`; //this line will not appear in the cosole
        //because when we use return the code below did not execute
    } else {
        return -1;
    }

    //
    //when are more than 2 arguments is necessary to use return
}

console.log(yearUntilRetirement(1991, 'Camilo'));
console.log(yearUntilRetirement(1970, 'Camilo'));
*/

///////////////////////////////////////////////////////////////////////////////////
//38. Code CHALLENGE

/* Write your code below. Good luck! 🙂 */
/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;


const scoreDolphins = calAverage(44, 23, 71);
const scoreKoalas = calAverage(65, 54, 49);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgKoalas + avgKoalas < avgDolphins){
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgDolphins + avgDolphins < avgKoalas) {
        console.log(`Dolphins win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log("No team wins...");
    }
}

console.log(checkWinner(scoreDolphins, scoreKoalas));
*/

///////////////////////////////////////////////////////////////////////////////////
//39. Introduction to arrays
/*
const friends = ['Michael', 'Pedro', 'Miguel'];
console.log(friends);

const year = new Array(1999, 2001, 2003);
console.log(friends[0]);

console.log(friends.length); //Give the number of elements in the array

//Expression that return the last element of an array
console.log(friends[friends.length - 1]);

//Mutating an array --> assigning a new value
//Note that you are change a value of the array despite having declared
//the value with conts
friends[2] = 'María'; // ths is because and array in not an inmutable value
console.log(friends);

const firstName = 'Christian';

const Tilano = [firstName, 'Escobar', 2021 - 1995, friends];
console.log(Tilano);

//Exercise

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const years = [1990, 1967, 202, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);

console.log(calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1]));

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];

console.log(ages);
*/

///////////////////////////////////////////////////////////////////////////////////
//40. Basic Array Operations
/*
const friends = ['Laura', 'Lisa', 'Lorena'];

//Methods to add values

//PUSH --> add a value at the end of the array
friends.push('Camila');
//Storing the lenght of an array in a variable
const newLength = friends.push('Juliana');
console.log(newLength);
//UNSHIFT --> add value in the first position of array
friends.unshift('Christian');

console.log(friends);

//Methods to remove values

friends.pop(); //Remove last
const popped = friends.pop()
console.log(popped);
console.log(friends);

friends.shift(); //Remove first
console.log(friends);

//Index of a value
console.log(friends.indexOf('Lisa'));
console.log(friends.indexOf('Sebas')); //Value not in the array --> result -1

//Verifies if a value in contain
friends.push(23);
console.log(friends.includes(23)); //Return true --> strict comparison
console.log(friends.includes('23')); //Return false
console.log(friends.includes('Lisa')); //Return true
console.log(friends.includes('Sebas')); //Return false

//Usign include method to make
if (friends.includes('Lisa')) {
    console.log('You have a friend called Lisa');
}
*/

///////////////////////////////////////////////////////////////////////////////////
//41. Exercise
/*
function calcTip(bill) {
    let tip;
    bill >= 50 && bill <= 300 ? tip = bill * 0.15 : tip = bill * 0.2;
    return tip;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [(bills[0] + calcTip(bills[0])), (bills[1] + calcTip(bills[1])), (bills[2] + calcTip(bills[2]))];

console.log(bills, tips);
*/

///////////////////////////////////////////////////////////////////////////////////
//42. Introduction to objects
/*
const christianArray = [
    'Christian',
    'Tilano',
    2000 - 1500,
    ['Fernando', 'Karen', 'Juliana']
]

//Below is an object --> with some properties
const chris = {
    firstName: 'Jonas',
    lastName: 'Tilano',
    age: 2000 - 1500,
    job: 'architect',
    friends: ['Fernando', 'Karen', 'Juliana']
}
*/

///////////////////////////////////////////////////////////////////////////////////
//43. Dot vs Brackets Notation
/*
const chris = {
    firstName: 'Christian',
    lastName: 'Tilano',
    age: 2000 - 1500,
    job: 'architect',
    friends: ['Fernando', 'Karen', 'Juliana']
}

console.log(chris.firstName); //Dot notation
console.log(chris['firstName']); //Brackets notation

//the string 'first' is concatenated with the value inside nameKey
const nameKey = 'Name';
console.log(chris['first' + nameKey]); //Inside the bracket you can put an expression
console.log(chris['last' + nameKey]);


const interestedIn = prompt('Hi, what do you wanna know about Christian? firstName, lastName, age, job or friends? choose one');

if (chris[interestedIn]) {
    console.log(chris[interestedIn]);
} else {
    console.log('Write a correct value! firstName, lastName, age, job or friends');
}

//Adding new properties to an object
chris.location = 'Cali';
chris.email = 'kristiantilano@gmail.com';

//console.log(chris);

//Challenge
//Log in the console: "Christian has 3 friends, and his best friend is called Michael"

console.log(`${chris.firstName} has ${chris.friends.length} friends, and his best friend is called ${chris.friends[2]}`)
*/

///////////////////////////////////////////////////////////////////////////////////
//43. Objects Methods
/*
const chris = {
    firstName: 'Christian',
    lastName: 'Tilano',
    birthYear: 1996,
    job: 'architect',
    friends: ['Fernando', 'Karen', 'Juliana'],
    hasDriverLicense: true,

    //A method is a function attached to an object
    //calcAge: function (birthYear) {
    //    return 2024 - birthYear;
    //}

    //writting the function usig the keyword this
    //calcAge: function () {
    //    return 2024 - this.birthYear;
    //}

    //Writting the method and storing the value in a new propertie
    calcAge: function () {
        this.age = 2024 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is ${this.calcAge()}-years old ${this.job}, and he has ${this.hasDriverLicense ? "a" : "no"} driver license`;
    }

}

console.log(chris.calcAge(chris.birthYear));//the function is called one time
console.log(chris.age);// the result is printed multiple times
console.log(chris.age);//this is a more efficient solution
console.log(chris.age);//no need to executed the function in every call

console.log(chris.getSummary());
*/

///////////////////////////////////////////////////////////////////////////////////
//Coding exercise

/* Write your code below. Good luck! 🙂 */
/*
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    //Calc BMI
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    //Calc BMI
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

mark.calcBMI();
john.calcBMI();

console.log(`${mark.bmi > john.bmi ? `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!` : `${john.fullName}'s BMI ${john.bmi} is higher than ${mark.fullName}'s (${mark.bmi})!`}`);
*/

///////////////////////////////////////////////////////////////////////////////////
//46. Iteration: The for loop
/*
//Keeps running while condition is true
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weight repetition ${rep}`);
}
*/

///////////////////////////////////////////////////////////////////////////////////
//47. Looping arrays
/*
const christianArray = [
    'Christian',
    'Tilano',
    2000 - 1500,
    ['Fernando', 'Karen', 'Juliana']
]

const types = [];

for (let i = 0; i < christianArray.length; i++) {
    console.log(christianArray[i], typeof christianArray); //log the content and the types of values store in the array
    //Filling types array
    //types[i] = typeof christianArray[i]; // this and below do the same
    types.push(typeof christianArray[i]);

}
console.log(types);
*/
/*
const years = [2000, 1996, 1994, 1997];
const ages = [];

for (let i = 0; i < years.length; i++) {

    ages.push(2037 - years[i]);
}

console.log(ages);
*/

//Continue and break statement
/*
const christianArray = [
    'Christian',
    'Tilano',
    2000 - 1500,
    ['Fernando', 'Karen', 'Juliana']
]

console.log('------USING THE CONTINUE STATEMENT-------');
//the code below skipt everything that is not a strings
for (let i = 0; i < christianArray.length; i++) {
    if (typeof christianArray[i] !== 'string') continue;
    console.log(christianArray[i], typeof christianArray);
}


console.log('------BREAK WITH NUMBER-------');
//stop running after finding the first number
for (let i = 0; i < christianArray.length; i++) {
    if (typeof christianArray[i] === 'number') break;
    console.log(christianArray[i], typeof christianArray);
}
*/

///////////////////////////////////////////////////////////////////////////////////
//48. Looping backwards and looping in loops

//Looping backwards
/*
const christianArray = [
    'Christian',
    'Tilano',
    2000 - 1500,
    ['Fernando', 'Karen', 'Juliana']
]

for (let i = christianArray.length - 1; i >= 0; i--) {
    console.log(christianArray[i]);
}
*/
//Loops in loops
/*
for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`--------Exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Lifting weight rep # ${rep}`);
    }


}
*/


///////////////////////////////////////////////////////////////////////////////////
//49. The while loop
/*
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weight rep # ${rep}`);
}
//Below is a while loop
let rep = 1;  //--> is a more versatile form of loop you only need a condition
while (rep <= 10) {
    console.log(`Lifting weight rep #${rep}`);
    rep++;
}



//Other example

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You roll a dice of ${dice}`)
    dice = Math.trunc(Math.random() * 6) + 1;

    if (dice === 6) {
        console.log(`The loop is about to end`);
    }
}
*/


///////////////////////////////////////////////////////////////////////////////////
//CODING CHALLENGE

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i <= bills.length - 1; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        //sum += arr[i]  --> is the same of above
    }

    let average = sum / arr.length;
    return average;
}

console.log(calcAverage(totals));