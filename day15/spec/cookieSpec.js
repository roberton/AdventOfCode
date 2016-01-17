'use strict';
/*
Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
*/
const solve = require('../solve');

describe('Cookie scorer', () => {
    const ingredients = [
        {
            name: 'Butterscotch',
            capacity: -1,
            durability: -2,
            flavor: 6,
            texture: 3,
            calories: 8
        },
        {
            name: 'Cinnamon',
            capacity: 2,
            durability: 3,
            flavor: -2,
            texture: -1,
            calories: 3
        }];
    const combination = [44, 56];

    it('example cookie has the correct score', () => {
        expect(solve.score(ingredients, combination).score).toBe(62842880);
    });
});
