const solve = require('../solve');

describe("AoC look-and-say iterator", function() {
    it("given '1' returns '11'", function() {
        expect(solve.iterate('1')).toBe('11');
    });

    it("given '11' returns '21'", function() {
        expect(solve.iterate('11')).toBe('21');
    });

    it("given '21' returns '1211'", function() {
        expect(solve.iterate('21')).toBe('1211');
    });

    it("given '1211' returns '111221'", function() {
        expect(solve.iterate('1211')).toBe('111221');
    });

    it("given '111221' returns '312211'", function() {
        expect(solve.iterate('111221')).toBe('312211');
    });
});
