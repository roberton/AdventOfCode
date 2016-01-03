"use strict";
const fs = require('fs');
const _ = require('lodash');


if (require.main === module) {
    // main('input.txt', 100); // for testing
    main('input.txt', 2503);    // answer is 2640
}

function main(filePath, time) {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
    const reindeerStats = parseFileData(data);
    console.log(reindeerStats);
    const distances = distancesAfterSeconds(reindeerStats, time);
    console.log();
    console.log(distances);
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
        // if (stat.name === 'Cupid') console.log(elapsedTime, distanceCovered);

        const flyingTime = Math.min(stat.duration, time - elapsedTime);
        distanceCovered += flyingTime * stat.speed;
        elapsedTime += flyingTime + stat.rest;

        // if (stat.name === 'Cupid') console.log(elapsedTime, distanceCovered);
    }
    return { name: stat.name, distance: distanceCovered }
}
