'use strict';
const fs = require('fs');
const _ = require('lodash');

if (require.main === module) {
    // Called directly
    main('input.txt');
}

// Answer is 535
function main(inputFilePath) {
    // TODO: use promise and asynchronous read file
    const input = loadReplacementsAndMolecule(inputFilePath);
    console.log(`Loaded ${input.replacements.length} replacements.\n
Starting molecule is:\n${input.molecule}
(length ${input.molecule.length})`);

    console.log('\nGenerating replacements...');
    const rawMolecules = generateSubstitutions(input.molecule, input.replacements);
    console.log(`Number of molecules = ${rawMolecules.length}`);
    // console.log(`Lengths of molecules: ${rawMolecules.map(m => m.length)}`);

    const uniqueMolecules = _.uniq(rawMolecules);
    console.log(`Number of unique molecules = ${uniqueMolecules.length}`);
}

function loadReplacementsAndMolecule(inputFilePath) {
    const data = fs.readFileSync(inputFilePath, 'utf8');
    const lines = data.split('\n');

    function convertReplacementLineToObject(line) {
        const lineElements = line.split(' ');
        return {
            from: _.first(lineElements),
            to: _.last(lineElements)
        }
    }

    return {
        replacements: lines
            .filter(line => line.split(' ').length === 3)
            .map(line => convertReplacementLineToObject(line)),
        molecule: _.first(lines.filter(line => line.length > 20))
    }
}

function generateSubstitutions(startingMolecule, replacements) {
    const substitutions = [];
    replacements.forEach(function(r) {
        const newSubs = genSubsForReplacement(startingMolecule, r);
        substitutions.push(newSubs);
    });

    return _.flatten(substitutions);
}

// TODO: probably a more functional way of doing this
function genSubsForReplacement(molecule, replacement) {
    const subs = [];
    let fromIndex = -1;
    let foundIndex = 0;
    while (foundIndex !== -1) {
        foundIndex = molecule.indexOf(replacement.from, fromIndex);
        if (foundIndex !== -1) {
            subs.push(`${molecule.substr(0, foundIndex)}${replacement.to}${molecule.substr(foundIndex + replacement.from.length)}`);
            fromIndex = foundIndex + 1;
        }
    }

    return subs;
}
