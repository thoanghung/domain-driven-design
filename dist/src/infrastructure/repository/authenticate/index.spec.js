"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('Authenticate Repository Testing', () => {
    const authenticateRepository = new _1.AuthenticateRepository();
    describe('getJWT testing', () => {
        describe('Normal case', () => {
            let result;
            let numberSegments;
            beforeAll(() => {
                result = authenticateRepository.getJWT(1, 'test@mail.com');
                numberSegments = result.split('.').length;
            });
            it('Returned JWT is not null or empty string', () => {
                expect(result).not.toBeNull();
                expect(result.length).toBeGreaterThan(0);
            });
            it('Returned JWT has 3 segments those split by dot (.)', () => {
                expect(numberSegments).toEqual(3);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map