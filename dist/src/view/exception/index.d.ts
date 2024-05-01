export declare const ViewErrorCode: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export type ViewErrorCode = typeof ViewErrorCode[keyof typeof ViewErrorCode];
export declare const ViewErrorDetailCode: {
    readonly USER_NOT_EXIST: "USER_NOT_EXIST";
};
export type ViewErrorDetailCode = typeof ViewErrorDetailCode[keyof typeof ViewErrorDetailCode];
interface ViewErrorParams {
    info?: {
        [key: string]: string;
    };
    message: string;
    code: ViewErrorCode;
}
export declare class ViewError extends Error {
    info?: {
        [key: string]: string;
    };
    message: string;
    code: ViewErrorCode;
    constructor(params: ViewErrorParams);
}
export {};
