"use strict";
const fs = require('fs');
var _ = require('lodash');

if (require.main === module) {
    // Called directly
    main('input.txt');
}

function main(inputFilePath) {
    const words = readWordsFromFile(inputFilePath);
    words.pop();
    console.log(`There are ${words.length} words to be checked.`);
    console.log(`There are ${countNiceWords(words)} nice words`);
}

// test('ugknbfddgicrmopn');
// test('aaa');
// test('jchzalrnumimnmhp');
// test('haegwjzuvuyypxyu');
// test('dvszwmarrgswjxmb');



function countNiceWords(words) {
    return _.reduce(words, (total, word) => {
        return total + (isWordNice(word) ? 1 : 0);
    }, 0);
}

function test(candidateWord) {
    console.log(`${candidateWord} ${convertBooleansToNiceOrNaughtyMessage(isWordNice(candidateWord))}`);
}

function isWordNice(word) {
    if (!containsEnoughVowels(word)) {
        // console.log('Not enough vowels');
        return false;
    }
    if (!containsConsecutiveLetter(word)) {
        // console.log('No consecutive letters');
        return false;
    }
    if (containsBannedPairs(word)) {
        // console.log('Contains banned pairs');
        return false;
    }

    return true;
}

function convertBooleansToNiceOrNaughtyMessage(isNice) {
    if (isNice) {
        return 'is NICE';
    }
    return 'is NAUGHTY';
}

function containsEnoughVowels(word) {
    const vowels = 'aeiou';
    let count = 0;

    for (let i = 0; i < word.length; i++) {
        if (vowels.indexOf(word[i]) !== -1) {
            count++;
        }
    };
    return count >= 3;
}

function containsConsecutiveLetter(word) {
    let lastLetter = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === lastLetter) {
            return true;
        }
        lastLetter = word[i];
    }
    return false;
}

function containsBannedPairs(word) {
    const pairs = ['ab', 'cd', 'pq', 'xy'];
    let containsBannedPairs = false;

    pairs.forEach(function(pair) {
        if (word.indexOf(pair) !== -1) {
            containsBannedPairs = true;
        }
    });

    return containsBannedPairs;
}

// TODO: try reading non-sync?
function readWordsFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    return data.split('\n');
}

exports.run = () => {
    main('day5/input.txt');
}
