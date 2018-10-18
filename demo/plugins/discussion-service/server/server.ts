import { Manifest,BaseServer } from "@project-sunbird/ext-framework-server/models";
import { Request, Response } from "express";
import { DiscussionResponse } from "./models";
import * as _ from "lodash";
import { telemetryHelper } from "./telemetryHelper";
const uuid = require("uuid/v1");

export class Server extends BaseServer {

  constructor(manifest: Manifest) {
    super(manifest);
  }

  public async createPost(req: Request, res: Response) {
    const request = _.pick(req.body.request, ["thread_id","body","created_on","user_id","user_info","tag"]);
    const insertObj = {
      thread_id: request.thread_id ? request.thread_id : uuid(), // thread id dosnt exist, creat new and insert.
      body: request.body,
      created_on: request.created_on,
      user_id: request.user_id,
      user_info: request.user_info,
      tag: request.tag
    };
    const model = new this.cassandra.instance.post(insertObj);
    await model.saveAsync()
    .then(data => this.sendSuccess(req,res,{created: "OK", thread_id: insertObj.thread_id}))
    .catch(error => this.sendError(req,res, {code:"ERR_CREATE_POST", msg: error}));
  }

  public async getPost(req: Request, res: Response) {
    const searchQuery = _.pick(req.body.request, ["thread_id", "tag"]);
    await this.cassandra.instance.post.findAsync(searchQuery)
    .then(data => this.sendSuccess(req,res,data))
    .catch(error => this.sendError(req,res, {code:"ERR_READ_POST", msg: error}));
  }

  public async deletePost(req: Request, res: Response) {
    const searchQuery = _.pick(req.body.request, ["thread_id", "tag"]);
    const searchResults = await this.cassandra.instance.post.findAsync(searchQuery).catch(error => Promise.resolve([]));
    const postIds = searchResults.map(element => element.post_id);
    if(postIds.length){
      this.cassandra.instance.post.deleteAsync({ post_id: { $in: postIds } })
      .then(data => this.sendSuccess(req,res,{deleted: "OK"}))
      .catch(error => this.sendError(req,res, {code:"ERR_DELETE_POST", msg: error}));
    } else {
        this.sendSuccess(req,res,{deleted: "OK"})
    }
  }

  private sendSuccess(req, res, data){
    res.status(200)
    .send(new DiscussionResponse(undefined, { id: 'api.discussion.service', data: data ? data : {}}))
    telemetryHelper.log(req);
  }

  private sendError(req,res,error){
    res.status(500)
    .send(new DiscussionResponse({
      id: "api.discussion.service",
      err: error.code || "ERR_DISCUSSION_SERVICE",
      errmsg: error.msg || "error"
    }));
    telemetryHelper.error(req, res, error);
  }
}