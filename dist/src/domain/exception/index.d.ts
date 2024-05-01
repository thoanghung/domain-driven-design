export declare const DomainErrorCode: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export type DomainErrorCode = typeof DomainErrorCode[keyof typeof DomainErrorCode];
export declare const DomainErrorDetailCode: {
    readonly INVALID_EMAIL_FORMAT: "INVALID_EMAIL_FORMAT";
    readonly USER_NAME_CAN_NOT_BE_EMPTY: "USER_NAME_CAN_NOT_BE_EMPTY";
    readonly INVALID_PASSWORD_FORMAT: "INVALID_PASSWORD_FORMAT";
};
export type DomainErrorDetailCode = typeof DomainErrorDetailCode[keyof typeof DomainErrorDetailCode];
interface DomainErrorParams {
    info?: {
        [key: string]: unknown;
    };
    code: DomainErrorCode;
    message: string;
}
export declare class DomainError extends Error {
    info?: {
        [key: string]: unknown;
    };
    code: DomainErrorCode;
    message: string;
    constructor(params: DomainErrorParams);
}
export {};
