const { getInput } = require('./helperFuncs.js');

/* Get floor */
getInput('https://adventofcode.com/2015/day/1/input', [getFloor, getBasementChar]); // Will supply input data to the callbacks.

// Question 1
function getFloor(inputData = '') {
    //console.log(inputData);

    console.time('Question 1 execution time')
    let floor = 0;
    for (let index = 0; index < inputData.length; index++) {
        if (inputData[index] === '(')
            floor++;
        else if (inputData[index] === ')')
            floor--;

    }

    console.log("Floor: " + floor);
    console.timeEnd('Question 1 execution time');
}

// Question 2
function getBasementChar(inputData = '') {

    console.time('Question 2 execution time')
    let floor = 0;
    let charPos = 0;
    for (let index = 0; index < inputData.length; index++) {
        if (inputData[index] === '(')
            floor++;
        else if (inputData[index] === ')')
            floor--;
        if (floor === -1) {
            charPos = index+1;
            break;
        }

    }

    console.log("Character position: " + charPos);
    console.timeEnd('Question 2 execution time');
}