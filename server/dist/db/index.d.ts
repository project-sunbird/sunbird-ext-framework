/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { CassandraDB } from './cassandra';
import { ElasticSearchDB } from './elasticsearch';
export declare class db {
    private _elasticsearch;
    private _cassandra;
    constructor(config: object);
    readonly elasticsearch: ElasticSearchDB;
    readonly cassandra: CassandraDB;
}
export * from './cassandra';
export * from './elasticsearch';
