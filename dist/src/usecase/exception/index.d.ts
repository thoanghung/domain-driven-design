export declare const UsecaseErrorCode: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
export type UsecaseErrorCode = typeof UsecaseErrorCode[keyof typeof UsecaseErrorCode];
export declare const UsecaseErrorDetailCode: {
    readonly MUST_SPECIFY_EMAIL_AND_PASSWORD: "MUST_SPECIFY_EMAIL_AND_PASSWORD";
    readonly EMAIL_DOES_NOT_EXISTS: "EMAIL_DOES_NOT_EXISTS";
    readonly INVALID_EMAIL_OR_PASSWORD: "INVALID_EMAIL_OR_PASSWORD";
    readonly EMAIL_IS_BEING_USED: "EMAIL_IS_BEING_USED";
    readonly USER_NOT_EXIST: "USER_NOT_EXIST";
    readonly CURRENT_PASS_NOT_MATCH: "CURRENT_PASS_NOT_MATCH";
    readonly POST_MUST_HAVE_IMAGE: "POST_MUST_HAVE_IMAGE";
    readonly NUMBER_OF_PICS_LIMITED: "NUMBER_OF_PICS_LIMITED";
    readonly POST_NOT_EXIST: "POST_NOT_EXIST";
    readonly UNAUTHORIZED_TO_UPDATE_POST: "UNAUTHORIZED_TO_UPDATE_POST";
    readonly UNAUTHORIZED_TO_DELETE_POST: "UNAUTHORIZED_TO_DELETE_POST";
    readonly SOURCE_USER_NOT_EXIST: "SOURCE_USER_NOT_EXIST";
    readonly DESTINATION_USER_NOT_EXIST: "DESTINATION_USER_NOT_EXIST";
    readonly HAVE_BEEN_FOLLOWING_USER: "HAVE_BEEN_FOLLOWING_USER";
    readonly CAN_NOT_FOLLOW_MYSELF: "CAN_NOT_FOLLOW_MYSELF";
    readonly NOT_FOLLOWING_USER: "NOT_FOLLOWING_USER";
    readonly HAVE_BEEN_LIKED_POST: "HAVE_BEEN_LIKED_POST";
    readonly HAVE_NOT_LIKED_POST: "HAVE_NOT_LIKED_POST";
    readonly COMMENT_CONTENT_CAN_NOT_EMPTY: "COMMENT_CONTENT_CAN_NOT_EMPTY";
    readonly COMMENT_NOT_EXIST: "COMMENT_NOT_EXIST";
    readonly UNAUTHORIZED_TO_DELETE_COMMENT: "UNAUTHORIZED_TO_DELETE_COMMENT";
    readonly IS_NOT_COMMENT_OF_POST: "IS_NOT_COMMENT_OF_POST";
    readonly UNAUTHORIZED_TO_UPDATE_COMMENT: "UNAUTHORIZED_TO_UPDATE_COMMENT";
};
export type UsecaseErrorDetailCode = typeof UsecaseErrorDetailCode[keyof typeof UsecaseErrorDetailCode];
interface UsecaseErrorParams {
    info?: {
        [key: string]: unknown;
    };
    message: string;
    code: UsecaseErrorCode;
}
export declare class UsecaseError extends Error {
    info?: {
        [key: string]: unknown;
    };
    message: string;
    code: UsecaseErrorCode;
    constructor(params: UsecaseErrorParams);
}
export {};
