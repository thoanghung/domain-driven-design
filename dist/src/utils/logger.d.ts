import * as log4js from 'log4js';
declare class Logger {
    default: log4js.Logger;
    system: log4js.Logger;
    api: log4js.Logger;
    access_req: log4js.Logger;
    access_res: log4js.Logger;
    sql: log4js.Logger;
    auth: log4js.Logger;
    constructor();
}
declare const _default: Logger;
export default _default;
