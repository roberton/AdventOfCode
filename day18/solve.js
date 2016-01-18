'use strict';
const fs = require('fs');
const _ = require('lodash');

// 768 lights for 1st star version
// 781 lights for 2nd star version
if (require.main === module) {
    let grid = loadGridFrom('input.txt');   // or 'testInput.txt'
    grid.dodgyLights = [0, 99, 9900, 9999];
    console.log(`Loaded grid of ${grid.size.width} by ${grid.size.height} lights. Initial grid has ${countLights(grid)} lights on.`);

    _.times(100, (iteration) => {
        grid = iterate(grid);
        console.log(`${iteration + 1} iteration: ${countLights(grid)} lights on.`)
    });

    // const indexes = _.range(3 * 3);
    // testNeighbourGeneration(indexes, {width: 3, height: 3});
}

// returns grid object with properties width, height and cells
function loadGridFrom(inputFilePath) {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    const lines = data.split('\n').filter(line => line.length > 0);
    const cellBooleans = data
        .split('')
        .filter(char => char !== '\n')
        .map(char => char === '#');
    return {
        size: {
            width: _.first(lines).length,
            height: lines.length,
        },
        lights: cellBooleans
    };
}

function iterate(grid) {
    let newGrid = {
        size: grid.size,
        lights: [],
        dodgyLights: grid.dodgyLights
    };

    newGrid.lights = grid.lights.map((light, index) =>
        calcIfLightNextIteration(light, countNeighboursForLightAt(index, grid))
    );
    grid.dodgyLights.forEach(index => newGrid.lights[index] = true);

    return newGrid;
}

function calcIfLightNextIteration(isAlive, neighbourCount) {
    if (neighbourCount === 3) {
        return true;
    }
    if (isAlive && (neighbourCount === 2 || neighbourCount === 3)) {
        return true;
    }
    return false;
}

function countNeighboursForLightAt(index, grid) {
    const neighbourIndices = getNeighbourIndicesFor(index, grid.size);
    return neighbourIndices
        .reduce((total, nIndex) => {
            return total + (grid.lights[nIndex] ? 1 : 0);
        }, 0);
}

function getNeighbourIndicesFor(index, gridSize) {
    let neighbours = [];
    const location = calcLocationByIndex(index, gridSize);
    // console.log(location);

    if ((location.x > 0) && (location.y > 0)) neighbours.push(index - gridSize.width - 1);
    if (location.y > 0) neighbours.push(index - gridSize.width);
    if ((location.x < (gridSize.width - 1)) && (location.y > 0)) neighbours.push(index - gridSize.width + 1);

    if (location.x > 0) neighbours.push(index - 1);
    if (location.x < (gridSize.width - 1)) neighbours.push(index + 1);

    if (location.x > 0 && location.y < (gridSize.height - 1)) neighbours.push(index + gridSize.width - 1);
    if (location.y < (gridSize.height - 1)) neighbours.push(index + gridSize.width);
    if (location.x < (gridSize.width - 1) && location.y < (gridSize.height - 1)) neighbours.push(index + gridSize.width + 1);

    return neighbours;
}

function calcLocationByIndex(index, gridSize) {
    const x = index % gridSize.width;
    const y = Math.floor(index / gridSize.height);
    return {
        x: x,
        y: y
    }
}

function countLights(grid) {
    return grid.lights
        .reduce((total, light) => {
            return total + (light ? 1 : 0);
        }, 0);
}

function printGrid(grid) {
    console.log(`Grid is ${grid.size.width} by ${grid.size.height} lights.`);
    // TODO: make this use _.times()
    for (let y = 0; y < grid.size.height; y++) {
        const rowStartIndex = y * grid.size.height;
        const rowEndIndex = (y + 1) * grid.size.height;
        console.log(mapLightLineToString(grid.lights.slice(rowStartIndex, rowEndIndex)));
    }
}

function mapLightLineToString(cellLine) {
    return lightLine
        .map(light => light ? '#' : '.')
        .join();
}

// returns list of neighbourIndices for a given index
function testNeighbourGeneration(indexes, gridSize) {
    const output = indexes.map(
        index => getNeighbourIndicesFor(index, gridSize)
    );

    console.log('testNeighbourGeneration:');
    console.log(output);
}
