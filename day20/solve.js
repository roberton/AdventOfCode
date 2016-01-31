'use strict';
const _ = require('lodash');

if (require.main === module) {
    // Called directly
    main(29000000);
}

// Binary search starting at 1 suggests: house number 1900544
// Binary search starting at 0 suggests: house number 983039
// Starting from 800,000, suggested 800,280. Too high.
// Starting from 750,000, suggested 750,960. Too high!
// Starting from 700,000, suggested 702,240, Too high!
// Starting from 650,000, suggested 665,280. At last!
function main(requiredPresents) {
    const houseNumber = findLowestHouseThatGetsAtLeast(requiredPresents, 625000);
    // const houseNumber = findLowestHouseUsingDivideAndConquer(requiredPresents);
    console.log(houseNumber);
}

function findLowestHouseThatGetsAtLeast(requiredPresents, startingHouse) {
    let houseNumber = startingHouse || 1;
    let maxPresents = 0;
    while (true) {
        maxPresents = Math.max(maxPresents, presentsForHouse(houseNumber));
        if (maxPresents >= requiredPresents) {
            console.log(`Found it, delivered ${maxPresents} for House ${houseNumber}!`);
            return houseNumber;
        }
        if ((houseNumber % 100) === 0) {
            console.log(`Delivered to house ${houseNumber}. Most presents delivered so far is ${maxPresents} (${Math.floor(maxPresents * 100/requiredPresents)})%`);
        }
        houseNumber++;
    }
}

// TODO: try writing this as a recursive function
function findLowestHouseUsingDivideAndConquer(requiredPresents) {
    let step = 65536;
    let underHouse = 0;
    let overHouse = 0;
    let house = 0;
    while (step > 1) {
        let presents = presentsForHouse(house);
        console.log(`Delivered ${presents} for House ${house}`)
        if (presents < requiredPresents) {
            house += step;
        }
        if (presents >= requiredPresents) {
            if (step > 1) {
                console.log(`\tBacking up a little... step size now ${step}`)
                step /= 2;
                house -= step;
            }
        }
    }
    return house;
}

function presentsForHouse(houseNumber) {
    return _.range(1, houseNumber + 1)
        .filter(elf => (houseNumber % elf) === 0)
        .reduce((total, elf) => {
            return total + elf * 10
        }, 0);
}

exports.presentsForHouse = presentsForHouse;
