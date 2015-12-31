"use strict";
const fs = require('fs');
const _ = require('lodash');

// Answer?
if (require.main === module) {
    main('1113222113', 30);
}

function main(sequence, remainingIterations) {
    // console.log(`Starting input is ${input}`);
    // let current = input;
    // for (let i = 0; i < iterations; i++) {
    //     current = iterate(current);
    //     console.log(`After ${i+1}, sequence is ${current}.`);
    // }

    console.log(`Current sequence is ${sequence}. ${remainingIterations} iterations remaining.`);
    if (remainingIterations > 0) {
        const nextSequence = iterate(sequence);
        setImmediate(main, nextSequence, remainingIterations - 1);
        console.log(`New sequence is ${nextSequence}.`);
    }
    else {
        console.log(`Finished.`);
    }
}

function iterate(sequence) {
    const sequenceArray = sequence.split();
    return grabRun(sequence).join('');
}

function grabRun(sequence) {
    if (sequence.length === 0) {
        return [];
    }

    const matchingChar = sequence[0];
    const run = _.takeWhile(sequence, char => (char === matchingChar));
    const remainingSequence = _.slice(sequence, run.length);

    let thingToReturn = [];
    thingToReturn.push(run.length);
    thingToReturn.push(matchingChar);
    Array.prototype.push.apply(thingToReturn, grabRun(remainingSequence));
    return thingToReturn;
}

exports.main = main;
exports.iterate = iterate;
