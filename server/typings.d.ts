import { Framework } from ".";

/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
declare module 'express-cassandra';
declare module 'util';
declare module 'short-hash';
declare module 'elasticsearch';

declare module "*.json!" {
    const value: any;
    export default value;
}