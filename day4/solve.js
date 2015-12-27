"use strict";
const md5 = require('md5');
const fs = require('fs');

if (require.main === module) {
    // Called directly
    main();
}

function main(inputFilePath) {
    const startNumber = processCommandLine(process.argv);

    let secretKey = 'ckczppom'; // the test key
    let hash = findHash(secretKey, startNumber);
    console.log(hash);
}

// TODO: generator?
// Note: tried all numbers up to 4 billion
function findHash(key, startNumber) {
    let hash = 0;
    const GIVEUP_LIMIT = startNumber + 500000000;

    for (let hash = startNumber; hash < GIVEUP_LIMIT; hash++) {
        let m = md5(key + hash.toString());
        if (m.substring(0, 5) === '000000') {
            return hash;
        }

        if ((hash % 1000000) === 0) {
            console.log(`Just tried ${hash / 1000000} million. Still looking...`);
        }
    }
}

function processCommandLine(commandLine) {
    if (!commandLine[2]) {
        return 0;
    }
    return commandLine[2];
}

exports.run = main;
