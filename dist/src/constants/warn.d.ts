export declare enum WarnCode {
    SYSTEM_WARN = "SYSTEM_WARN"
}
export declare const WARN_MESSAGE: {
    [key: string]: string;
};
export declare const getWarnMessage: (warnCode: WarnCode) => string;
