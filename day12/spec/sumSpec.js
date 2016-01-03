const solve = require('../solve');

describe("Number summer (for edge cases)", () => {
    it("given '[]' returns 0", function() {
        expect(solve.sumDoc(JSON.parse('[]'))).toBe(0);
    });

    it("given '{}' returns 0", function() {
        expect(solve.sumDoc(JSON.parse('{}'))).toBe(0);
    });

    it("given '42' returns 42", function() {
        expect(solve.sumDoc(JSON.parse('42'))).toBe(42);
    });
});

describe("Number summer (for given examples)", () => {
    it("given '[1,2,3]' returns 6", function() {
        expect(solve.sumDoc(JSON.parse('[1,2,3]'))).toBe(6);
    });

    it("given '{\"a\":2,\"b\":4}' returns 6", function() {
        const document = JSON.parse('{"a":2,"b":4}');
        expect(solve.sumDoc(document)).toBe(6);
    });

    it("given '[[[3]]]' returns 3", function() {
        const document = JSON.parse('[[[3]]]');
        expect(solve.sumDoc(document)).toBe(3);
    });

    it("given '{a:{b:4},c:-1}' returns 3", function() {
        const document = JSON.parse('{"a":{"b":4},"c":-1}');
        expect(solve.sumDoc(document)).toBe(3);
    });

    it("given '{a:[-1,1]}' returns 0", function() {
        const document = JSON.parse('{"a":[-1,1]}');
        expect(solve.sumDoc(document)).toBe(0);
    });

    it("given '[-1,{a:1}]' returns 0", function() {
        const document = JSON.parse('[-1,{"a":1}]');
        expect(solve.sumDoc(document)).toBe(0);
    });
});
