'use strict';
const fs = require('fs');
const _ = require('lodash');

if (require.main === module) {
    const containers = loadContainersFrom('input.txt');
    const combinations = findCombinations(containers, 150);
}

function loadContainersFrom(filePath) {
    const inputData = fs.readFileSync(filePath, 'utf8');
    return inputData.split('\n');
}

function findCombinations(containers, quantity) {
    let combinations = [];
    fillContainers(containers, [], quantity);
    return combinations;
}

function fillContainers(containers, used, eggnogLeft) {
    // process.stdout.write('.');
    // console.log(`Looking at ${containers} and ${eggnogLeft}`);
    if (eggnogLeft === 0) {
        console.log(`HURRAY! Reached successful leaf! Combination is ${used}`);
        return;
    }

    if (eggnogLeft < 0) {
        // console.log(`Reached unsuccessful leaf!`);
        return;
    }

    if (containers.length === 0) {
        // console.log(`Reached unsuccessful leaf with ${eggnogLeft} litres of eggnog remaining`);
        return;
    }

    const head = _.first(containers);
    const tail = _.rest(containers);
    fillContainers(tail, used.concat(head), eggnogLeft - head);
    fillContainers(tail, used, eggnogLeft);
}

module.exports = {
    findCombinations: findCombinations
};
