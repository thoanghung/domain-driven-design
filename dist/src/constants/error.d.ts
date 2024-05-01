export declare enum ErrorCode {
    SYSTEM_ERR = "SYSTEM_ERR",
    INVALID_PASSWORD_ERR = "INVALID_PASSWORD_ERR"
}
export declare const ERROR_MESSAGE: {
    [key: string]: string;
};
export declare const getErrorMessage: (errorCode: ErrorCode) => string;
