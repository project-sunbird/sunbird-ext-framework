import { Manifest } from 'ext-framework-server/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
import { Framework } from 'ext-framework-server';
import { Util } from 'ext-framework-server/Util';
import * as cassandraSchema from './db/cassandra/schema_1.0.json';
import * as esSchema from './db/es/schema_1.0.json';
import * as _ from 'lodash';
import { IElasticSearchConnector, ICassandraConnector } from 'ext-framework-server/interfaces';

export class Server implements IProfileService {

  private manifest: Manifest;
  private cassandra: any;
  private userDetails: any = {};
  private elasticsearch: IElasticSearchConnector;

  constructor(manifest: Manifest) {
    this.manifest = manifest;
    this.cassandra = Framework.api.getCassandraInstance(manifest.id);
    this.elasticsearch = Framework.api.getElasticsearchInstance(manifest.id);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    let userId = req.params.id, responseData = [];
    if (!userId) return res.send({ status: 'error', message: `Invalid request, 'userId' is missing! ` }).status(400);

    let userProfile = await this.elasticsearch.search({
      index: 'profile',
      body: { query: { match: { user_id: userId } } }
    });
    if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
    res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
  }

  public async getAllUser(req: Request, res: Response) {
    try {
      let responseData = [];
      let userProfile = await this.elasticsearch.search({
        index: 'profile',
        body: { query: { match_all: {} } }
      });
      if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
      res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
    } catch (error) {
      res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request` }).status(500);
    }
  }

  public async setUser(req: Request, res: Response) {
    let user = _.pick(req.body, ['first_name', 'last_name']);
    user = { ...{ "user_id": this.cassandra.uuid(), "last_name": "", "first_name": "" }, ...user };
    const model = new this.cassandra.instance.profile({ ...user })
    // insert into cassandra
    await model.saveAsync()
      .then(() => {
        console.log('new user has been added');
      })
      .then(async () => {
        // insert into elasticsearch
        await this.elasticsearch.index({ index: 'profile', type: 'doc', body: user })
      })
      .then(() => {
        res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: { user_id: user.user_id } }).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request`, error: err }).status(500);
      });
  }

  public async searchUsers(req: Request, res: Response) {
    try {
      let filters = req.body.filters, responseData = [];
      filters = { ...{ "user_id": "", "last_name": "", "first_name": "" }, ...filters };
      let userProfile = await this.elasticsearch.search({
        index: 'profile',
        body: { query: { match: { filters } } }
      });
      if (userProfile) userProfile.hits.hits.forEach((obj) => responseData.push(obj._source));
      res.send({ status: 'success', rid: Framework.api.threadLocal().get('requestId'), data: responseData }).status(200);
    } catch (error) {
      res.send({ status: 'error', rid: Framework.api.threadLocal().get('requestId'), message: `Could not able to process request` }).status(500);
    }
  }
}