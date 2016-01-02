const solve = require('../solve');

describe("Password to number utility", () => {
    it("given 'aaaaaaaa' returns 0", function() {
        expect(solve.passwordToNumber('a')).toBe(0);
    });

    it("given 'aaaaaaab' returns 1", () => {
        expect(solve.passwordToNumber('aaaaaaab')).toBe(1);
    });

    it("given 'aaaaaaba' returns 23", () => {
        expect(solve.passwordToNumber('aaaaaaba')).toBe(23);
    });

    it("given 'baaaaaaa' returns 3404825447", () => {
        expect(solve.passwordToNumber('baaaaaaa')).toBe(3404825447);
    });
});

describe("Number to password utility", () => {
    it("given 0 returns 'aaaaaaaa'", function() {
        expect(solve.numberToPassword(0)).toBe('aaaaaaaa');
    });

    it("given 1 returns 'aaaaaaab'", () => {
        expect(solve.numberToPassword(1)).toBe('aaaaaaab');
    });

    it("given 23 returns 'aaaaaaba'", () => {
        expect(solve.numberToPassword(23)).toBe('aaaaaaba');
    });

    it("given 3404825447 returns 'aaaaaaba'", () => {
        expect(solve.numberToPassword(3404825447)).toBe('baaaaaaa');
    });
});

describe("Sequence tester", () => {
    it("abc", () => expect(solve.isStraight('abc')).toBe(true));

    it("def", () => expect(solve.isStraight('def')).toBe(true));

    it("deg", () => expect(solve.isStraight('deg')).toBe(false));
});

describe("Santa's password generator", () => {
    it("given 'abcdefgh' returns 'abcdffaa'", () =>
        expect(solve.generateNextPassword('abcdefgh')).toBe('abcdffaa')
    );

    xit("given 'ghijklmn' returns 'ghjaabcc'", () =>
        expect(solve.generateNextPassword('ghijklmn')).toBe('ghjaabcc')
    );
});
