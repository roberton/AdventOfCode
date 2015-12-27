"use strict";
const fs = require('fs');
const _ = require('lodash');

if (require.main === module) {
    // Called directly
    main('input.txt');
}

function main(inputFilePath) {
    var directions = readDirectionsFromFile(inputFilePath);
    console.log(`There are ${directions.length} moves to be followed.`);

    var houses = deliverPresents(directions);
    console.log(`There are ${houses.size} houses that receive at least one present`);
}

function deliverPresents(directions) {
    let houses = new Set();
    let currentHouse = {x: 0, y: 0};
    houses.add(locationToHash(currentHouse));

    for (let i = 0; i < directions.length; i++) {
        currentHouse = deliver(currentHouse, directions[i]);
        houses.add(locationToHash(currentHouse));
    }

    return houses;
}

function deliver(currentHouse, direction) {
    switch (direction) {
        case '<':
            return { x: currentHouse.x - 1, y: currentHouse.y };
        case '>':
            return { x: currentHouse.x + 1, y: currentHouse.y };
        case '^':
            return { x: currentHouse.x, y: currentHouse.y + 1 };
        case 'v':
            return { x: currentHouse.x, y: currentHouse.y - 1 };
    }
    return currentHouse;
}

function locationToHash(location) {
    return `x${location.x}y${location.y}`;
}


// TODO: try reading non-sync?
function readDirectionsFromFile(fileName) {
    var data = fs.readFileSync(fileName, 'utf8');
    return data;
}

exports.run = () => main('day3/input.txt');
