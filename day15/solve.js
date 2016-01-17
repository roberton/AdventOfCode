'use strict';
const _ = require('lodash');

if (require.main === module) {
    main();
}

// TODO: rename
// answer is less than 50,000,000 (9.1s)
function main() {
    const ingredients = [
        {
            name: 'Sprinkles',
            capacity: 5,
            durability: -1,
            flavor: 0,
            texture: 0,
            calories: 5
        },
        {
            name: 'PeanutButter',
            capacity: -1,
            durability: 3,
            flavor: 0,
            texture: 0,
            calories: 1
        },
        {
            name: 'Frosting',
            capacity: 0,
            durability: -1,
            flavor: 4,
            texture: 0,
            calories: 6
        },
        {
            name: 'Sugar',
            capacity: -1,
            durability: 0,
            flavor: 0,
            texture: 2,
            calories: 8
        }
    ];

    const combinations = findQuadCombinations(100);
    const bestCombination = findBestScore(ingredients, combinations);
    console.log(JSON.stringify(bestCombination));
}

/* For four ingredientes only
    Total combinations:
    3 values = 10
    4 values = 20
    5 values = 35
    6 values = 56
    11 values = 286
    101 values = 176,851
    */
function findQuadCombinations(total) {
    let combinations = [];
    for (let i = 0; i <= total; i++) {
        const firstPairs = makePairsThatSumTo(i);
        const secondPairs = makePairsThatSumTo(total - i);

        // TODO: utility function to merge two arrays
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

function findBestScore(ingredients, combinations) {
    const scores = combinations.map(combination => score(ingredients, combination));
    console.log(scores);
    return _.max(scores, item => item.score);
}

// length of both ingredients and combination must be the same
// TODO: everything!
function score(ingredients, combination) {
    let capacityScore = 0;
    for (let i = 0; i < combination.length; i++) {
        capacityScore += combination[i] * ingredients[i].capacity;
    }

    let durabilityScore = 0;
    for (let i = 0; i < combination.length; i++) {
        durabilityScore += combination[i] * ingredients[i].durability;
    }

    let flavorScore = 0;
    for (let i = 0; i < combination.length; i++) {
        flavorScore += combination[i] * ingredients[i].flavor;
    }

    let textureScore = 0;
    for (let i = 0; i < combination.length; i++) {
        textureScore += combination[i] * ingredients[i].texture;
    }

    const score = capacityScore * durabilityScore * flavorScore * textureScore;
    return { score: score, combination: combination };
}

// TODO: better
exports.findBestScore = findBestScore;
exports.score = score;
