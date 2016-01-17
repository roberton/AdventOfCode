'use strict';
const solve = require('../solve');

describe('Eggnog container combinations solver', () => {

    it('For example scenario, finds four combinations', ()  => {
        const containers = [20, 15, 10, 5, 5];
        const eggnog = 25;
        expect(solve.findCombinations(containers, eggnog).length).toBe(4);
    });
});
