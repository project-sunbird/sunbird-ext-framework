import {CassandraDB} from 'ext-framework-server/db/cassandra';
import {ElasticSearchDB} from 'ext-framework-server/db/elasticsearch';
import * as util from 'ext-framework-server/util';
import {IServer} from 'ext-framework-server/interfaces';
import {Manifest} from 'ext-framework-server/models/manifest';
import { Request, Response } from 'express';

export interface IProfileService extends IServer {
	getUser(req: Request, res: Response): void;
	searchUsers(req: Request, res: Response): void;
}

export class ProfileService implements IProfileService {

	private config: object = null;
	private manifest: Manifest = null;
	private cassandraDB: CassandraDB;

	constructor(config: object, manifest: Manifest) {
		this.config = config;
		this.manifest = manifest;
		this.cassandraDB = new CassandraDB(config);
	}

	public getUser(req: Request, res: Response) {
		let id = req.params['userId'];
		let connection = this.cassandraDB.getConnection(this.manifest);
		/*
		cassandraDB.findOne({tableName: "profile", where: {"user_id": id}}, function(err, user) {
			if(err) {
				res.send(util.error(err));
			} else {
				res.send(util.ok(user));
			}
		});*/
	}

	public searchUsers(req: Request, res: Response) {
		let body = req.body;
		let searchQuery = {}; // create searchQuery from body json
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