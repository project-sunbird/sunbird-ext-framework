import cassandraDB from 'ext-framework-server/db/cassandra';
import searchDB from 'ext-framework-server/db/elasticsearch';
import util from 'ext-framework-server/util';
import {IServer} from 'ext-framework-server/interfaces';
import {Manifest} from 'ext-framework-server/models/manifest';

export interface IProfileService extends IServer {
	new(config: object, manifest: Manifest): IServer;
}

export class ProfileService implements IProfileService {

	private config: object = null;
	private manifest: Manifest = null;

	constructor(config: object, manifest: Manifest) {
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