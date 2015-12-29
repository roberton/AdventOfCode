"use strict";
const fs = require('fs');
const _ = require('lodash');

// TODO: make grid an encapsulated object with methods to toggle etc
// Part 1 answer is 210,154
// Note: timeing info for 50 operations
//  v1: 7.486s
//  v2: 1.512s (w/o counting lights)
//  v3: 5.393s (counting, but not the 'out of', so any flatten takes some time)

if (require.main === module) {
    // Called directly
    main('input.txt');
}

function main(inputFilePath) {
    const operations = readOperationsFrom(inputFilePath);

    let grid;
    grid = initialiseGrid(grid, 1000);
    console.log(`Number of lights on = ${countLights(grid)})`);

    for (let i = 0; i < 50 /*operations.length*/; i++) {
        grid = applyOperationToGrid(grid, operations[i]);
        console.log(`Operation ${i + 1} / ${operations.length}`);
    }
    console.log(`Final number of lights on = ${countLights(grid)})`);
}


///

// Reads from file, returning list of operations.
// Each operation is a triple: {command, start, end}
function readOperationsFrom(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const operations = lines
        .filter(line => line.length > 0)
        .map(line => makeOperationFromInputLine(line));

    return operations;
}

function makeOperationFromInputLine(line) {
    const wordsInLine = line.split(' ');
    if (wordsInLine.length === 4) {
        return buildToggleOperation(wordsInLine[1], wordsInLine[3]);
    }
    if (wordsInLine[1] === 'on') {
        return buildOnOperation(wordsInLine[2], wordsInLine[4]);
    }
    return buildOffOperation(wordsInLine[2], wordsInLine[4]);
}

function buildToggleOperation(startNumberString, endNumberString) {
    return {
        command: 'toggle',
        start: buildCoordFromString(startNumberString),
        end: buildCoordFromString(endNumberString)
    };
}

function buildOnOperation(startNumberString, endNumberString) {
    return {
        command: 'on',
        start: buildCoordFromString(startNumberString),
        end: buildCoordFromString(endNumberString)
    };
}

function buildOffOperation(startNumberString, endNumberString) {
    return {
        command: 'off',
        start: buildCoordFromString(startNumberString),
        end: buildCoordFromString(endNumberString)
    };
}

function buildCoordFromString(coordString) {
    const coordElements = coordString.split(',');
    const coords = coordElements.map(c => parseInt(c, 10));
    return {x: coords[0], y: coords[1]};
}

function initialiseGrid(grid, size) {
    grid = new Array(size * size);
    _.fill(grid, false);
    return grid;
}

function countLights(grid) {
    return grid
        .reduce((count, light) => {
            return count + (light ? 1 : 0);
        }, 0);
}

function applyOperationToGrid(grid, operation) {
    const operandCells = buildOperandCells(operation.start, operation.end);
    operandCells.forEach(
        (cell) => applyCellCommandToGrid(grid, operation.command, cell)
    );

    return grid;
}

// TODO: less forEach, more map
function buildOperandCells(startCoord, endCoord) {
    const xrange = _.range(startCoord.x, endCoord.x + 1);
    const yrange = _.range(startCoord.y, endCoord.y + 1);

    let operandCells = [];
    xrange.forEach(x => {
        yrange.forEach(y => {
            operandCells.push({x: x, y: y});
        });
    });

    return operandCells;
}

function applyCellCommandToGrid(grid, command, cell) {
    const gridIndex = cell.x + 1000 * cell.y;

    if (command === 'on') {
        grid[gridIndex] = true;
    }
    else if (command === 'off') {
        grid[gridIndex] = false;
    }
    else if (command === 'toggle') {
        grid[gridIndex] = !(grid[gridIndex]);
    }
    else {
        throw 'Invalid command!';
    }
}
