'use strict';
const _ = require('lodash');

if (require.main === module) {
    // main();
    const ingredients = ['Sprinkles', 'PeanutButter', 'Frosting', 'Sugar'];
    const combinations = findQuadCombinations(100);
    console.log(combinations);
    console.log(combinations.length);
}

/* For four ingredientes only
    Total combinations:
    3 values = 10
    4 values = 20
    5 values = 35
    6 values = 56
    101 values = 176,851
    */
function findQuadCombinations(total) {
    let combinations = [];
    for (let i = 0; i <= total; i++) {
        const firstPairs = makePairsThatSumTo(i);
        const secondPairs = makePairsThatSumTo(total - i);

        firstPairs.forEach(pair1 => {
            secondPairs.forEach(pair2 => {
                let comb = _.flatten(pair1);
                comb.push(pair2[0]);
                comb.push(pair2[1]);
                combinations.push(comb);
            });
        });
    }
    return combinations;
}

function makePairsThatSumTo(total) {
    let pairs = [];
    const first = _.range(0, total + 1);

    first.forEach((element) => pairs.push([element, total - element]));
    return pairs;
}
