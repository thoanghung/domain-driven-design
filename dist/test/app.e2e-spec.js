"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
describe('AppController (e2e)', () => {
    let app;
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map