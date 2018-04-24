import { CassandraDB, cassandraDriver } from 'ext-framework-server/db/cassandra';
import { ElasticSearchDB } from 'ext-framework-server/db/elasticsearch';
import { Manifest } from 'ext-framework-server/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
//import { KafkaClient } from 'ext-framework-server/messaging';
import { JwtAuthService } from 'ext-framework-server/auth';
import { Framework } from 'ext-framework-server';
import * as casssandraSchema from './db/cassandra/schema_1.0.json';
import * as esSchema from './db/es/schema_1.0.json';
import * as _ from 'lodash';

export class Server implements IProfileService {

	private manifest: Manifest = null;
	private cassandra: cassandraDriver.Client;
	private userDetails: any = {};

	constructor(manifest: Manifest) {
		this.manifest = manifest;
		this.cassandra = Framework.api.getCassandraInstance(manifest.id, (<any>casssandraSchema));
	}

	public async getUser(req: Request, res: Response): Promise<Response> {
		let userId = req.params.id;
		if (!userId) return res.send({ status: 'error', message: `Invalid request, 'userId' is missing! ` }).status(400);

		await this.cassandra.connect()
			.then(async () => {
				let userProfile = await this.cassandra.execute(`SELECT * FROM profile where user_id = ?`, [userId]);
				res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: { user: userProfile.rows } }).status(200);
			})
			.catch((err) => {
				res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request`, error: err }).status(500);
			});
	}

	public async getAllUser(req: Request, res: Response) {
		await this.cassandra.connect()
			.then(async () => {
				let userProfile = await this.cassandra.execute(`SELECT * FROM profile`);
				res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: { user: userProfile.rows } }).status(200);
			})
			.catch((err) => {
				res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request`, error: err }).status(500);
			});
	}

	public async setUser(req: Request, res: Response) {
		let user = _.pick(req.body, ['user_id', 'first_name', 'last_name']);
		user = { ...{ "user_id": "", "last_name": "", "first_name": "" }, ...user };
		await this.cassandra.connect()
			.then(async () => {
				await this.cassandra.execute(`INSERT INTO profile (user_id, first_name, last_name) values(?,?,?)`, [user.user_id, user.first_name, user.last_name]);
				res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: {user_id: user.user_id} }).status(200);
			})
			.catch((err) => {
				res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request`, error: err }).status(500);
			});
	}

	public searchUsers(req: Request, res: Response) {
		let filters = req.body.filters;
		let searchQuery = {}; // create searchQuery from body json
		res.send('search result api working!');
	}

	// public TestMessagingService() {
	// 	console.log('calling TestMessagingService');
	// 	let kafkaClient = KafkaClient.connect();
	// 	let producer = kafkaClient.createProducer();
	// 	let payloads = [
	// 			{ topic: 'topic1', messages: 'hi', partition: 0 },
	// 			{ topic: 'topic2', messages: ['hello', 'world'] }
	// 	];

	// 	producer.on('ready', function () {
	// 		producer.createTopics(['topic1', 'topic2'], false, (error, data) => {
	// 			console.log('topics created!', error, data)
	// 			producer.send(payloads, function (err, data) {
	// 				console.log('sending payloads!', err, data);
	// 			});
	// 		})
	// 	});

	// 	producer.on('error', function (err) {
	// 		console.log('producer error', err)
	// 	})

	// 	let consumer = kafkaClient.createConsumer([{topic: 'topic1', partition: 0 }]);
	// 	consumer.on('message', function (message) {
	// 		console.log('message from client!' ,message);
	// 	});

	// }
}