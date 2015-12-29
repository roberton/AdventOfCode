"use strict";
const fs = require('fs');
const _ = require('lodash');

// For input.txt, the answer is 1342
if (require.main === module) {
    // Called directly
    main('input.txt');
    // main('test_input.txt');
}

function main(filePath) {
    const strings = readStringsFrom(filePath);
    const codeSizes = strings.map(string => measureCodeSizeFor(string));
    const memorySizes = strings.map(string => measureMemorySizeFor(string));

    const totalCodeSize = codeSizes.
        reduce((count, codeSize) => count + codeSize, 0);
    const totalMemorySize = memorySizes.
        reduce((count, memorySize) => count + memorySize, 0);

    console.log(`Total code size is ${totalCodeSize}, total memory size is ${totalMemorySize}`);
    console.log(`Difference is ${totalCodeSize - totalMemorySize}`);
}

function readStringsFrom(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    return lines;
}

function measureCodeSizeFor(string) {
    return string.length;
}

function measureMemorySizeFor(string) {
    const stringContent = string.substr(1, string.length - 2);
    const stringWithoutEscapedContent = stringContent
        .split('\\\"').join()
        .split('\\\\').join();

    console.log(stringWithoutEscapedContent.split('\\x'));
    const numberOfHexSequences = stringWithoutEscapedContent.split('\\x').length - 1;
    return stringWithoutEscapedContent.length - numberOfHexSequences * 3;

    // return stringContent.length
    //     - count(stringContent, '\\\"')
    //     - count(stringContent, '\\\\')
    //     - count(stringContent, '\\x') * 3;
}

function count(string, sequence) {
    return string.split(sequence).length - 1;
}
