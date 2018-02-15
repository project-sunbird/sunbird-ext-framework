/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import * as elasticsearch from 'elasticsearch';

let client = new elasticsearch.Client({
	host: 'localhost:9200',
  	log: 'trace'
});


export class ElasticSearchConnection {
	// generic wrapper for all
	
}