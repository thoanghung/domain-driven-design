import { Response, Request } from 'express';
import { HttpException } from '@nestjs/common';
export declare const requestLogger: (request: Request) => void;
export declare const responseLogger: (input: {
    requestId: number;
    response: Response;
    data: FixType;
}) => void;
export declare const responseErrorLogger: (input: {
    requestId: number;
    exception: HttpException | Error;
}) => void;
