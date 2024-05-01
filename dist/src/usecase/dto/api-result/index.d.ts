import { ErrorCode } from '@constants/error';
import { WarnCode } from '@constants/warn';
import BaseDto from '../base';
export declare const ApiResultCode: {
    readonly OK: "OK";
    readonly WARN: "WARN";
    readonly ERROR: "ERROR";
};
export type ApiResultCode = typeof ApiResultCode[keyof typeof ApiResultCode];
export declare class ApiError extends BaseDto {
    code: ErrorCode;
    message: string;
    constructor(code: ErrorCode);
}
export declare class ApiWarn extends BaseDto {
    code: WarnCode;
    message: string;
    constructor(code: WarnCode);
}
export default class ApiResultDto extends BaseDto {
    code: ApiResultCode;
    warnList: ApiWarn[];
    errorList: ApiError[];
    message?: string;
    constructor(params: {
        code: ApiResultCode;
        message?: string;
        warnList: ApiWarn[];
        errorList: ApiError[];
    });
    static ok(): ApiResultDto;
    static warn(warnList: ApiWarn[]): ApiResultDto;
    static error(errorList: ApiError[]): ApiResultDto;
}
