"use strict";
const fs = require('fs');
const _ = require('lodash');

const VALID_CHARS = 'abcdefghjkmnpqrstuvwxyz';


if (require.main === module) {
    // main('mini.json');
    main('input.json'); // Total is 191164
}

function main(filePath) {
    const document = readDocument(filePath);
    const sum = sum(document);
    console.log(`Sum of all numbers from ${filePath} is ${sum}.`);
}

function readDocument(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function sumDoc(doc) {
    // console.log(`sumNumbers called with ${typeof doc}`);
    let sum = 0;
    if (typeof doc === 'number') {
        sum += doc;
    }
    else if (Array.isArray(doc)) {
        sum = sumArray(doc);
    }
    else if (typeof doc === 'object') {
        sum = sumObject(doc);
    }
    else {
        console.log(`Ignoring >>${doc}<<`);
    }
    return sum;
}

function sumArray(doc) {
    // console.log(`sumArray called with ${doc}`);
    let sum = 0;
    for (let element of doc) {
        sum += sumDoc(element);
    }
    return sum;
}

function sumObject(doc) {
    // console.log(`sumObject called with ${doc}`);
    let sum = 0;
    for (let element in doc) {
        sum += sumDoc(doc[element]);
    }
    return sum;
}

// Exports
exports.sumDoc = sumDoc;
