/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import './ESSchemaLoader';
import {Manifest} from '../../models/Manifest';
import { ElasticSearchConnection } from './ElasticSearchConnection';

export class ElasticSearchDB {

	static getConnection(manifest: Manifest): ElasticSearchConnection {
		return new ElasticSearchConnection();
	}
}

export const elasticSearchDB = ElasticSearchDB;