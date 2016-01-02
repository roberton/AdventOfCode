"use strict";
const fs = require('fs');
const _ = require('lodash');

const VALID_CHARS = 'abcdefghjkmnpqrstuvwxyz';

// Answer for vzbxkghb is vzbxxyzz
if (require.main === module) {
    // main('vzbxkghb');
    main('vzbxxyzz'); // for a second star
}

function main(currentPassword) {
    const nextPassword = generateNextPassword(currentPassword);
    console.log(`Next password after ${currentPassword} is >> ${nextPassword} <<`);
}

function generateNextPassword(curPassword) {
    let candidatePassword = curPassword;
    do {
        candidatePassword = generateCandidatePassword(candidatePassword);
        console.log(`next candidate... ${candidatePassword}`);
    } while(!isValid(candidatePassword));

    return candidatePassword;
}

function generateCandidatePassword(currentPassword) {
    const passNumber = passwordToNumber(currentPassword);
    const nextPassNumber = passNumber + 1;
    return numberToPassword(nextPassNumber);
}

function isValid(password) {
    if (countPairs(password) < 2) {
        return false;
    };
    return hasStraight(password);
}

// TODO: use reduce
function passwordToNumber(password) {
    let number = 0;
    for (let i = password.length - 1; i >= 0; i--) {
        number += Math.pow(VALID_CHARS.length, password.length - i - 1) * VALID_CHARS.indexOf(password[i]);
    }
    return number;
}

function numberToPassword(number) {
    const PASSLENGTH = 8;
    let password = [];
    let remainder = number;
    for (let i = 0; i < PASSLENGTH; i++) {
        const powerIndex = PASSLENGTH - i - 1;
        const powerValue = Math.pow(VALID_CHARS.length, powerIndex);

        let charIndex = 0;
        if (remainder >= powerValue) {
            charIndex = Math.floor(remainder / powerValue);
            remainder -= (charIndex * powerValue);
        }
        password.push(VALID_CHARS[charIndex]);
    }
    return password.join('');
}

function countPairs(password) {
    let pairs = [];
    for (let pairSlot = 0; pairSlot < password.length - 1; pairSlot++) {
        if (password[pairSlot] === password[pairSlot + 1]) {
            pairs.push(password[pairSlot]);
        }
    }
    const uniquePairs = _.uniq(pairs, true);
    return uniquePairs.length;
}

function hasStraight(password) {
    for (let candidateStart = 0; candidateStart < password.length - 2; candidateStart++) {
        if (isStraight(password.substr(candidateStart, 3))) {
            return true;
        }
    }
    return false;
}

function isStraight(threeLetterString) {
    const sequenceAsNumbers = threeLetterString.split('')
        .map(char => VALID_CHARS.indexOf(char));

    if ((sequenceAsNumbers[0] === (sequenceAsNumbers[1] - 1)) &&
        (sequenceAsNumbers[0] === (sequenceAsNumbers[2] - 2))) {
        return true;
    }
    return false;
}

exports.generateNextPassword = generateNextPassword;

// These are for TDD-ing
exports.passwordToNumber = passwordToNumber;
exports.numberToPassword = numberToPassword;
exports.isStraight = isStraight;
