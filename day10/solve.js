"use strict";
const fs = require('fs');
const _ = require('lodash');

// Answer?
if (require.main === module) {
    main('1113222113', 30);
    // main('1', 5);
}

// Takes a sequence as a string and number of iterations to perform,
// such that remainingIterations=0 is a noop.
function main(sequence, remainingIterations) {
    console.log(`Current sequence is ${sequence}. ${remainingIterations} iterations remaining.`);
    if (remainingIterations > 0) {
        const nextSequence = iterate(sequence);
        setImmediate(main, nextSequence, remainingIterations - 1);
        console.log(`New sequence is ${nextSequence}.`);
        console.log(`New sequence's length is ${nextSequence.length}.`);
    }
    else {
        console.log(`Finished.`);
    }
}

function iterate(sequenceString) {
    let sequence = sequenceString.split('');
    let newSequence = [];

    while (sequence.length > 0) {
        const nextElementPair = calcNextElementPair(sequence);
        newSequence.push(nextElementPair[0], nextElementPair[1]);
    }

    return newSequence.join('');
}

function calcNextElementPair(sequence) {
    const matchingChar = sequence.shift();
    let matchCount = 1;
    while (sequence[0] === matchingChar) {
        matchCount++;
        sequence.shift();
    }

    return [matchCount, matchingChar];
}

exports.main = main;
exports.iterate = iterate;
