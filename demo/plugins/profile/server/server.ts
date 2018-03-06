import { CassandraDB } from 'ext-framework-server/src/db/cassandra';
import { ElasticSearchDB } from 'ext-framework-server/src/db/elasticsearch';
import { Manifest } from 'ext-framework-server/src/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
import { FrameworkConfig } from 'ext-framework-server/src/interfaces';

export class Server implements IProfileService {

	private config: FrameworkConfig = null;
	private manifest: Manifest = null;
	private cassandraDB: CassandraDB;
	private userDetails: any;

	constructor(config: FrameworkConfig, manifest: Manifest) {
		this.config = config;
		this.manifest = manifest;
		this.cassandraDB = new CassandraDB(config);
	}

	public getUser(req: Request, res: Response) {
		let id = req.params['userId'];
		if (!this.userDetails) {
			this.userDetails = {};
			this.userDetails.avatar = "https://sunbirddev.blob.core.windows.net/user/874ed8a5-782e-4f6c-8f36-e0288455901e/File-01242833565242982418.png";
			this.userDetails.firstName = "John";
			this.userDetails.lastName = "Doe";
			this.userDetails.department = "Science";
			this.userDetails.hireDate = "2010-08-04";
			this.userDetails.dob = "1978-03-04";
			this.userDetails.gender = "Male";
			this.userDetails.email = "john.doe@test.com";
			this.userDetails.phone = "9876543210";
		}
		res.send(this.userDetails);
		/*
		let connection = this.cassandraDB.getConnection(this.manifest);
		cassandraDB.findOne({tableName: "profile", where: {"user_id": id}}, function(err, user) {
			if(err) {
				res.send(util.error(err));
			} else {
				res.send(util.ok(user));
			}
		});*/
	}

	public setUser(req: Request, res: Response) {
		this.userDetails = req.body;
		res.send().status(200);
	}

	public searchUsers(req: Request, res: Response) {
		let body = req.body;
		let searchQuery = {}; // create searchQuery from body json
		res.send('search result api working!');
		/*
		searchDB.search(searchQuery, function(err, results) {
			if(err) {
				res.send(util.error(err));
			} else {
				let resp = {};// transform results into API response format
				res.send(util.ok(resp));
			}
		});*/
	}
}