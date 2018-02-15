/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import * as cassandra from './cassandra';
import * as es from './elasticsearch';

export const db = {
	elasticsearch: es.elasticSearchDB,
	cassandra: cassandra.cassandraDB
}

export * from './cassandra';
export * from './elasticsearch';