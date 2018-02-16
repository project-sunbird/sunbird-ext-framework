/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import './CassandraSchemaLoader';
import { Manifest } from '../../models/Manifest';
export declare class CassandraDB {
    private _config;
    constructor(config: any);
    getConnection(manifest: Manifest): any;
}
export declare const cassandraDB: typeof CassandraDB;
