const fs = require('fs');

if (require.main === module) {
    // Called directly
    main('input.txt');
}

function main(inputFile) {
    fs.readFile(inputFile, 'utf8', function (err, data) {
        if (err) throw err;
        displayWhenReachBasement(data);
    });
}

function findWhenReachFloor(data, floor) {
    var currentFloor = 0;
    for (var i = 0; i < data.length; i++) {
        var char = data[i];
        if (char == ')') {
            currentFloor--;
        }
        else {
            currentFloor++;
        }
        if (currentFloor === floor) {
            return i + 1;
        }
    }

    console.log(`Final floor = ${currentFloor}`);
};


// displayWhenReachBasement(")");
// displayWhenReachBasement("()())");

function displayWhenReachBasement(data) {
    console.log(data.length);
    var position = findWhenReachFloor(data, -1);
    if (position) {
        console.log(`Reached basement at position ${position}`);
    }
    else {
        console.log(`Didn\'t reach basement`);
    }
}

exports.run = () => {
    main('day1/input.txt');
}
