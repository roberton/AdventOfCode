"use strict";
const fs = require('fs');
const _ = require('lodash');


if (require.main === module) {
    // main('input.txt', 100); // for testing
    main('input.txt', 2503);    // answer is 2640
}

function main(filePath, time) {
    const data = fs.readFileSync(filePath, 'utf8');
    const reindeerStats = parseFileData(data);
    const distances = distancesAfterSeconds(reindeerStats, time);
    displayResults(distances, time);
}

function parseFileData(data) {
    const lines = data.split('\n');
    const stats = lines
        .filter(line => line.length > 0)
        .map(function(line) {
            const words = line.split(' ');
            return {
                name: words[0],
                speed: parseInt(words[3], 10),
                duration: parseInt(words[6], 10),
                rest: parseInt(words[13], 10)
            };
        });
    return stats;
}

function distancesAfterSeconds(stats, time) {
    return stats
        .map(stat => distanceForReindeerAfterSeconds(stat, time));
}

function distanceForReindeerAfterSeconds(stat, time) {
    let elapsedTime = 0;
    let distanceCovered = 0;
    while (elapsedTime < time) {
        const flyingTime = Math.min(stat.duration, time - elapsedTime);
        distanceCovered += flyingTime * stat.speed;
        elapsedTime += flyingTime + stat.rest;
    }
    return { name: stat.name, distance: distanceCovered }
}

function displayResults(results, time) {
    console.log(`The results after ${time} seconds are as follows:`);
    let winner = { distance: -1 };
    results.forEach(
        (result) => {
            console.log(`\t${result.name} covered ${result.distance} km`);
            if (result.distance > winner.distance) {
                winner = result;
            }
        });
    console.log(`The winner is ${winner.name}!`);
}
