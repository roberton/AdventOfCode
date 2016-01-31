'use strict';

const solve = require('../solve');

describe('Elf Delivery Service', () => {

    it('delivers 10 presents for House 1', () => {
        expect(solve.presentsForHouse(1)).toBe(10);
    })

    it('delivers 30 presents for House 2', () => {
        expect(solve.presentsForHouse(2)).toBe(30);
    })

    it('delivers 40 presents for House 3', () => {
        expect(solve.presentsForHouse(3)).toBe(40);
    })

    it('delivers 130 presents for House 9', () => {
        expect(solve.presentsForHouse(9)).toBe(130);
    })
});
