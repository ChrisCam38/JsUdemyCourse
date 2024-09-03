// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
const { message } = require('statuses');


const x = 5 + 122;

const calcAge = birthYear => 2043 - birthYear;

console.log(calcAge(x));
console.log('ffdjdfdj');
console.log('df');
*/
//

///////////////////////////////////////////////////////////////
//55. Setting up a prettier VS code

/*
Intalling some extensions in VS code:
    1. Prettier --> Apply to the code a specific format

    you can specify what kind of format apply to the different part of the code
    To do so you need to CREATE a file .prettierrc

    2. CREATING SNIPEST IN VS CODE:

    Go to file / preference / Configure user snippets / New global snippet file

    3. Settings sync --> syncronize the settings of Vs code in different devices

    4. TO DO HIGHLIGHT 
*/

///////////////////////////////////////////////////////////////
//56. Installing Node.js and se

/*
Intalling some extensions in VS code:
    1. Prettier --> Apply to the code a specific format

    you can specify what kind of format apply to the different part of the code
    To do so you need to CREATE a file .prettierrc

    2. CREATING SNIPEST IN VS CODE:

    Go to file / preference / Configure user snippets / New global snippet file

    3. Settings sync --> syncronize the settings of Vs code in different devices

    4. TO DO HIGHLIGHT 
*/

///////////////////////////////////////////////////////////////
//57. Learning how to code

/*
How to fail at coding                   
    1. Not having a clear goal                            --------->     Set a clear goal 

    2. Copying code without understanding how it works    --------->     Always type the code, and dont move on without understanding

    3. Not reinforce what you learn and not practicing    --------->    Use the new knowledge after learning something new

    4. Frustrated and lose motivation                     --------->    


///////////////////////////////////////////////////////////////
//59. Using Google stackOverflow and MDN

//PROBLEM>
/*We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes ther might be a senser error."*/
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [3, -2, -6, -1, 'error', 9, 7, 8, 25, 30, 5];

//1) Understanding the problem
//- What is temp amplitude? Answer: difference between highest and lowest temp

//-How to compute max and min temperatures?
//-What's a sensor error? And what to do?

//2) Breaking up into sub- problems
//-How to ignore errors?
//-Find min value in temp array
//-Find min value in temp array
//-Subtract min form max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0]; //assuming that the first value is the maximum
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    let currentValue = temps[i];
    if (typeof currentValue !== 'number') continue;

    if (currentValue > max) max = currentValue;
    if (currentValue < min) min = currentValue;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

//PROBLEM 2:

//Function now should receive two values

//1) Understanding the problem
//With two array should we implement the functionality twuice?
//No, only is necessary to merge the two arrays

/2)Breaking up into s/ub problems
//-Merge the two arrays

const calcTempAmplitudeNew = function (temp1, temp2) {

    const temp3 = temp1.concat(temp2);

    let max = temp3[0]; //assuming that the first value is the maximum
    let min = temp3[0];
  
    for (let i = 0; i < temp3.length; i++) {
      let currentValue = temp3[i];
      if (typeof currentValue !== 'number') continue;
  
      if (currentValue > max) max = currentValue;
      if (currentValue < min) min = currentValue;
    }
    console.log(max, min);
    return max - min;
  };
  
  const amplitudeNew = calcTempAmplitudeNew(temperatures, temperatures2);
  console.log(amplitudeNew);
*/

//////////////////////////////////////////////////////////////////////////////////////////////
//60. Debugging (fixing errors)

//SOFTWARE BUG: Is defect or problem in a computer program, any unexpected or unintended behavior

///////////////////////////////////////////////////////////////////////////////////////////////
//61. Debugging with the console and breakpoints
/*
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: 10,
  };

  console.table(measurement); //print a table throug the console
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());

//------------------------------------------------------------------------------------------------

const calcTempAmplitudeNew = function (temp1, temp2) {

  const temp3 = temp1.concat(temp2);

  let max = temp3[0]; //assuming that the first value is the maximum
  let min = temp3[0];

  for (let i = 0; i < temp3.length; i++) {
    let currentValue = temp3[i];
    if (typeof currentValue !== 'number') continue;

    if (currentValue > max) max = currentValue;
    if (currentValue < min) min = currentValue;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcTempAmplitudeNew([7, 4, 6], [8, 7, 9]);
console.log(amplitudeBug);
*/

///////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

//1) UNDERSTANDING THE PROBLEM
//Use the temperatures inside the array to log a message through the console

//2) BREAKING THE PROBLEM IN SUBPROBLEMS
//-Determine the number of temperatures in the array (nTemps)
//- baseString = "...(temp1Value) in (tempPosition) days"
/*
let printForecast = function (arr) {
  let messageArray = [];
  for (let i = 0; i < arr.length; i++) {
    let baseString = `...${arr[i]}ºC in ${i + 1} days`
    messageArray.push(baseString);
  }

  let text = messageArray.toString();
  console.log(text + `...`);

};

printForecast([12, 5, -5, 0, 4]);
*/
const printForecast = function (arr) {
  const messageArray = arr.map((temp, i) => `...${temp}ºC in ${i + 1} days`);
  console.log(messageArray.join('\n') + '...');
};

printForecast([12, 5, -5, 0, 4]);
