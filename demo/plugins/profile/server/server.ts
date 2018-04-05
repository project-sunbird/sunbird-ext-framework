import { CassandraDB } from 'ext-framework-server/db/cassandra';
import { ElasticSearchDB } from 'ext-framework-server/db/elasticsearch';
import { Manifest } from 'ext-framework-server/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
import { FrameworkConfig } from 'ext-framework-server/interfaces';
//import { KafkaClient } from 'ext-framework-server/messaging';
import { JwtAuthService } from 'ext-framework-server/auth';

export class Server implements IProfileService {

	private config: FrameworkConfig = null;
	private manifest: Manifest = null;
	private cassandraDB: CassandraDB;
	private userDetails: any = {};

	constructor(config: FrameworkConfig, manifest: Manifest) {
		this.config = config;
		this.manifest = manifest;
		this.cassandraDB = new CassandraDB(config.db.cassandra);
	}

	public getUser(req: Request, res: Response) {
		console.log('getUser request', req.header);
		res.send({ status: 'success', data: this.userDetails[req.params['id']] }).status(200);
	}

	public getAllUser(req: Request, res: Response): void {
		res.send({ status: "success", data: this.userDetails }).status(200);
	}

	public setUser(req: Request, res: Response) {
		this.userDetails[req.body.userId] = req.body;
		if(req.header['signed-context']) {
			JwtAuthService.verifyToken(req.header['signed-context']).then((token) => {
				res.send({ status: 'success', data: { userId: req.body.userId }, message: 'request context token is verified'}).status(200);
			}).catch((error) => {
				res.send({ status: 'error', message: error.message }).status(400);
			})
		} else {
			res.send({ status: 'success', data: { userId: req.body.userId }, message: 'request context token not verified'}).status(200);
		}

	}

	public searchUsers(req: Request, res: Response) {
		let body = req.body;
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