export declare const InfrastructureErrorCode: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export type InfrastructureCode = typeof InfrastructureErrorCode[keyof typeof InfrastructureErrorCode];
export declare const InfrastructureErrorDetailCode: {
    readonly CAN_NOT_GET_PUT_URL: "CAN_NOT_GET_PUT_URL";
    readonly UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED: "UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED";
    readonly RDB_USER_NOT_EXIST: "RDB_USER_NOT_EXIST";
    readonly MUST_SPECIFY_USER_ID: "MUST_SPECIFY_USER_ID";
    readonly MUST_SPECIFY_USER_DETAIL_ID: "MUST_SPECIFY_USER_DETAIL_ID";
    readonly IMAGE_KEY_CAN_NOT_BE_EMPTY: "IMAGE_KEY_CAN_NOT_BE_EMPTY";
    readonly MUST_SPECIFY_POST_ID: "MUST_SPECIFY_POST_ID";
    readonly RDB_POST_NOT_EXIST: "RDB_POST_NOT_EXIST";
    readonly MUST_SPECIFY_COMMENT_ID: "MUST_SPECIFY_COMMENT_ID";
    readonly RDB_COMMENT_NOT_EXIST: "RDB_COMMENT_NOT_EXIST";
};
export type InfrastructureErrorDetailCode = typeof InfrastructureErrorDetailCode[keyof typeof InfrastructureErrorDetailCode];
interface InfraStructureErrorParams {
    info?: {
        [key: string]: unknown;
    };
    code: InfrastructureCode;
    message: string;
}
export declare class InfrastructureError extends Error {
    info?: {
        [key: string]: unknown;
    };
    code: InfrastructureCode;
    message: string;
    constructor(params: InfraStructureErrorParams);
}
export {};
