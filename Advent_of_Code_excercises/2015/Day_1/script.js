const {getInput} = require('./helperFuncs.js');

/* Get floor */
getInput('https://adventofcode.com/2015/day/1/input', getFloor)

function getFloor(inputData='') {
    console.log(inputData);

    console.time('Execution time')
    let floor = 0;
    for (let index = 0; index < inputData.length; index++) {
        if(inputData[index] === '(')
        floor++;
        else if(inputData[index] === ')')
        floor--;
        
    }

    console.log("Floor: " + floor);
    console.timeEnd('Execution time');
}