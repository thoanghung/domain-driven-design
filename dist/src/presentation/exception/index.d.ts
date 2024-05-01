export declare const PresentationErrorCode: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export type PresentationErrorCode = typeof PresentationErrorCode[keyof typeof PresentationErrorCode];
export declare const PresentationErrorDetailCode: {
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly INVALID_FILE_TYPE: "INVALID_FILE_TYPE";
};
export type PresentationErrorDetailCode = typeof PresentationErrorDetailCode[keyof typeof PresentationErrorDetailCode];
interface PresentationErrorParams {
    info?: {
        [key: string]: unknown;
    };
    code: PresentationErrorCode;
    message: string;
}
export declare class PresentationError extends Error {
    info?: {
        [key: string]: unknown;
    };
    code: PresentationErrorCode;
    message: string;
    constructor(params: PresentationErrorParams);
}
export {};
