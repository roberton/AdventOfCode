fs = require('fs');
_ = require('lodash');

if (require.main === module) {
    // Called directly
    main('input.txt');
}

function main(inputFile) {
    var parcels = readParcelsFromFile(inputFile);
    console.log(`There are ${parcels.length} parcels to be wrapped.`);

    var paperNeeded = calculatePaper(parcels);
    console.log(`The total amount of paper needed for is ${paperNeeded} square feet`);

    var ribbonNeeded = calculateRibbon(parcels);
    console.log(`The total amount of ribbon needed for is ${ribbonNeeded} feet`);
}

function calculatePaper(parcels) {
    return _.reduce(parcels, (sum, parcel) => {
        return sum + calculatePaperForParcel(parcel);
    }, 0);
}

function calculateRibbon(parcels) {
    return _.reduce(parcels, (sum, parcel) => {
        return sum + calculateRibbonForParcel(parcel);
    }, 0);
}

/////////////////////

// Some tests!
// console.log(`Paper needed for 2x3x4 is ${calculatePaperForParcel(makeParcelFromString('2x3x4'))}`);
// console.log(`Paper needed for 1x1x10 is ${calculatePaperForParcel(makeParcelFromString('1x1x10'))}`);

// console.log(`Ribbon needed for 4x3x2 is ${calculateRibbonForParcel(makeParcelFromString('4x3x2'))}`);
// console.log(`Ribbon needed for 1x1x10 is ${calculateRibbonForParcel(makeParcelFromString('1x1x10'))}`);

/////////////////////


// TODO: try reading non-sync?
function readParcelsFromFile(fileName) {
    var data = fs.readFileSync(fileName, 'utf8');
    var lines = _.filter(data.split('\n'), isValidLine);

    var parcels = _.map(lines, (line) => {
        return makeParcelFromString(line);
    });

    return parcels;
}

function isValidLine(line) {
    return line.length > 0;
}

function makeParcelFromString(parcelString) {
    var dimensions = parcelString.split('x');
    return {
        length: dimensions[0],
        width: dimensions[1],
        height: dimensions[2]
    };
}

function calculatePaperForParcel(parcel) {
    var areasOfSides = [
        parcel.length * parcel.width,
        parcel.width * parcel.height,
        parcel.height * parcel.length];

    return 2 * areasOfSides[0] + 2 * areasOfSides[1] + 2 * areasOfSides[2] + Math.min(...areasOfSides);
}

function calculateRibbonForParcel(parcel) {
    var sortedDimensions = _.values(parcel).sort((l, r) => { return l - r });

    return 2 * sortedDimensions[0] + 2 * sortedDimensions[1] +
        sortedDimensions[0] * sortedDimensions[1] * sortedDimensions[2];
}

exports.run = function() {
    main('day2/input.txt');
}
