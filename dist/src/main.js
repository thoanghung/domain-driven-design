"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const error_interceptor_1 = require("./presentation/interceptor/error-interceptor");
const presentation_1 = require("./presentation");
const http_interceptor_1 = require("@presentation/interceptor/http-interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(presentation_1.ApiModule, {
        cors: {
            origin: [/127.0.0.1|localhost/],
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
            credentials: true,
        },
    });
    app.setGlobalPrefix('v1');
    app.useGlobalInterceptors(new error_interceptor_1.ErrorInterceptor());
    app.useGlobalInterceptors(new http_interceptor_1.HttpInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('NewAnigram Swagger')
        .setVersion('1.0')
        .setDescription('NewAnigram internal API')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('doc', app, swaggerDocument);
    await app.listen(3000, () => {
        console.info(`
API url: http://127.0.0.1:3000,
Swagger url: http://127.0.0.1:3000/doc,
    `);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map