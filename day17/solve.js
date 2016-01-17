'use strict';
const fs = require('fs');
const _ = require('lodash');

// Solution was 1638 for part 1
if (require.main === module) {
    const containers = loadContainersFrom('input.txt');
    const combinations = findCombinations(containers, 150);
    // const combinations = findCombinations([20, 15, 10, 5, 5], 25);
    console.log(`Found ${combinations.length} ways to pack the eggnog!`);

    const histogram = makeHistogramOfCombinations(combinations);
    console.log(histogram);
}

function loadContainersFrom(filePath) {
    const inputData = fs.readFileSync(filePath, 'utf8');
    return inputData.split('\n');
}

function findCombinations(containers, quantity) {
    let combinations = fillContainers(containers, [], quantity);
    return combinations;
}

function fillContainers(containers, used, eggnogLeft) {
    if (eggnogLeft === 0) {
        console.log(`HURRAY! Reached successful leaf! Combination is ${used}`);
        return [used];
    }

    if (eggnogLeft < 0) {
        return [];
    }

    if (containers.length === 0) {
        return [];
    }

    const head = _.first(containers);
    const tail = _.rest(containers);
    let happy = fillContainers(tail, used.concat(head), eggnogLeft - head);
    return happy.concat(fillContainers(tail, used, eggnogLeft));
}

// Returns object key keys for length of combination and value the number of
// combinations of that length
function makeHistogramOfCombinations(combinations) {
    let histogram = {};
    combinations.forEach(combination => {
        const length = combination.length;
        if (_.has(histogram, length)) {
            histogram[length] += 1;
        }
        else {
            _.set(histogram, length, 1);
        }
    });
    return histogram;
}

module.exports = {
    findCombinations: findCombinations
};
