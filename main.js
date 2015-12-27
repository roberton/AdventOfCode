'use strict'
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

console.log('Advent of Code');
console.log('==============');


const requestedDay = processCommandLine(process.argv);
const availableDays = findAvailableDays();

if (availableDays.indexOf(requestedDay) !== -1) {
    console.log(`About to run solution for day ${requestedDay}...`);
    runDay(requestedDay);
}
else {
    console.log(`Sorry, need to choose one of the following days: ${availableDays}`);
}


/////////////////////////////////////////////

function processCommandLine(argv) {
    return parseInt(argv[2]);
}

// TODO: could use reduce instead of forEach and then not need variable dayFolders
function findAvailableDays() {
    const startDir = '.';
    let dayFolders = [];

    const files = fs.readdirSync(startDir);
    files.map(file => path.join(startDir, file))
        .filter(file => fs.statSync(file).isDirectory())
        .filter(file => file.substring(0, 3) === 'day')
        .forEach(function (file) {
            // console.log(file);
            dayFolders.push(convertDayFolderNameToNumber(file));
        });

    return dayFolders;
}

function convertDayFolderNameToNumber(folderName) {
    return parseInt(folderName.substring(3), 10);
}

function runDay(day) {
    const pathToRun = `./day${day}/solve.js`;
    const inputPath = `./day${day}/input.txt`;
    const newModule = require(pathToRun);

    newModule.run(inputPath);
}
