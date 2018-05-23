import { Manifest } from 'ext-framework-server/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
import { Framework } from 'ext-framework-server';
import * as casssandraSchema from './db/cassandra/schema_1.0.json';
import * as esSchema from './db/es/schema_1.0.json';
import * as _ from 'lodash';
import { IElasticSearchConnector, ICassandraConnector } from 'ext-framework-server/interfaces';

export class Server implements IProfileService {

	private manifest: Manifest = null;
	private cassandra: ICassandraConnector;
	private userDetails: any = {};
	private elasticsearch: IElasticSearchConnector;
	constructor(manifest: Manifest) {
		this.manifest = manifest;
		this.cassandra = Framework.api.getCassandraInstance(manifest.id, (casssandraSchema));
		this.elasticsearch = Framework.api.getElasticsearchInstance(manifest.id, (esSchema));
	}

	public async getUser(req: Request, res: Response): Promise<Response> {
		let userId = req.params.id, responseData = [];
		if (!userId) return res.send({ status: 'error', message: `Invalid request, 'userId' is missing! ` }).status(400);

		let userProfile = await this.elasticsearch.search({
			index: 'dzrjz_profile',
			body: { query: { match: { user_id: userId } } }
		});
		if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
		res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
	}

	public async getAllUser(req: Request, res: Response) {
		try {
			let responseData = [];
			let userProfile = await this.elasticsearch.search({
				index: 'dzrjz_profile',
				body: { query: { match_all: {} } }
			});
			if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
			res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
		} catch (error) {
			res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request` }).status(500);
		}
	}

	public async setUser(req: Request, res: Response) {
		let user = _.pick(req.body, ['user_id', 'first_name', 'last_name']);
		user = { ...{ "user_id": "", "last_name": "", "first_name": "" }, ...user };
		await this.cassandra.connect()
			.then(async () => {
				// insert into cassandra
				await this.cassandra.execute(`INSERT INTO profile (user_id, first_name, last_name) values(?,?,?)`, [user.user_id, user.first_name, user.last_name]);
			})
			.then(async () => {
				// insert into elasticsearch
				await this.elasticsearch.index({ index: 'dzrjz_profile', type: 'profile', body: user })
			})
			.then(() => {
				res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: { user_id: user.user_id } }).status(200);
			})
			.catch((err) => {
				res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request`, error: err }).status(500);
			});
	}

	public async searchUsers(req: Request, res: Response) {
		try {
			let filters = req.body.filters, responseData = [];
			filters = { ...{ "user_id": "", "last_name": "", "first_name": "" }, ...filters };
			let userProfile = await this.elasticsearch.search({
				index: 'dzrjz_profile',
				body: { query: { match: { filters } } }
			});
			if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
			res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
		} catch (error) {
			res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request` }).status(500);
		}
	}
}