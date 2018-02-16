/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import './ESSchemaLoader';
import { Manifest } from '../../models/Manifest';
export declare class ElasticSearchDB {
    private _config;
    constructor(config: any);
    getConnection(manifest: Manifest): any;
}
