import cassandraDB from 'ext-framework-server/db/cassandra';
import searchDB from 'ext-framework-server/db/elasticsearch';
import util from 'ext-framework/util';

export class ProfileService {

	private config: IConfig = null;
	private manifest: Manifest = null;

	constructor(private config: IConfig, manifest: Manifest) {
		this.config = config;
		this.manifest = manifest;
	}

	public static getUser(req: any, res: any) {
		let id = req.getParam('userId');
		let connection = cassandraDB.getConnection(this.manifest);
		cassandraDB.findOne({tableName: "profile", where: {"user_id": id}}, function(err, user) {
			if(err) {
				res.send(util.error(err));
			} else {
				res.send(util.ok(user));
			}
		});
	}

	public static searchUsers(req: any, res: any) {
		let body = req.body;
		let searchQuery = {}; // create searchQuery from body json
		searchDB.search(searchQuery, function(err, results) {
			if(err) {
				res.send(util.error(err));
			} else {
				let resp = {};// transform results into API response format
				res.send(util.ok(resp));
			}
		});
	}
}