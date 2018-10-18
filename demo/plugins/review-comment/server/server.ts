import { Manifest,BaseServer} from "@project-sunbird/ext-framework-server/models";
import { Request, Response } from "express";
import { ReviewResponse } from "./models";
import * as _ from "lodash";
import { telemetryHelper } from "./telemetryHelper";
import { HTTPService as http } from "@project-sunbird/ext-framework-server/services";
const pluginBaseUrl = 'http://localhost:4000/'; // should be taken form env variable
const discussionCreateUrl = "discussion/v1/create/post";
const discussionReadUrl = "discussion/v1/read/post";
const discussionDeleteUrl = "discussion/v1/delete/post";

export class Server extends BaseServer {
  constructor(manifest: Manifest) {
    super(manifest);
  }
  public async createComment(req: Request, res: Response) {

    const requestBody = _.pick(req.body.request, [ "context_details", "body", "created_on", "user_id", "user_info"]);
    const contextDetails = await this.getContextFromDb(requestBody.context_details).catch(error => Promise.resolve({}));
    const threadId = _.get(contextDetails, "thread_id");
    if (threadId) {
      this.callCreatePostApi(requestBody, threadId)
      .then(response => this.sendSuccess(req,res,{created: "OK"}))
      .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error}));
    } else {
      this.callCreatePostApi(requestBody)
      .then(response => {
          this.saveContextDetails(requestBody, response.data.result.thread_id)
          .then(data => this.sendSuccess(req,res,{created: "OK"}))
          .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error}));
        })
        .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error}));
    }
  }
  private async getContextFromDb(context_details, options = { method: 'findOne'}) {
    if(options.method === 'findAll'){
      return this.cassandra.instance.context_details.findAsync(context_details);
    }
    return this.cassandra.instance.context_details.findOneAsync(context_details);
  }
  private callCreatePostApi(requestBody, threadId?){
      const disData: any = {
        request: {
          body: requestBody.body,
          user_id: requestBody.user_id,
          user_info: requestBody.user_info,
          tag: this.getTag(requestBody.context_details)
        }
      };
      if(threadId) disData.request.thread_id = threadId;
      return http.post(pluginBaseUrl + discussionCreateUrl,disData).toPromise();
  }
  private async saveContextDetails(requestBody, thread_id){
      const insertObj = {
          thread_id: thread_id,
          content_id: requestBody.context_details.content_id,
          content_ver: requestBody.context_details.content_ver,
          content_type: requestBody.context_details.content_type,
          stage_id: requestBody.context_details.stage_id
        };
      const model = new this.cassandra.instance.context_details(insertObj);
      return model.saveAsync();
  }
  public async getCommentList(req: Request, res: Response) {
    const requestBody = _.pick(req.body.request, ["context_details"]);
    const searchOptions = {
      method: requestBody.context_details.stage_id ? 'findOne' : 'findAll'
    }
    const contextDetails = await this.getContextFromDb(requestBody.context_details,searchOptions).catch(err => Promise.resolve({}));
    if(requestBody.context_details.stage_id  && _.get(contextDetails, "thread_id")){ // fetch comments at stage level

      const request = { thread_id : _.get(contextDetails, "thread_id")};
      this.callReadCommentApi(request)
      .then(response => { 
        const sortedComments = this.sortComments([contextDetails], response.data.result);
        this.sendSuccess(req,res,{comments: sortedComments})
      })
      .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_READ", msg: error}));

    } else if (!requestBody.context_details.stage_id && contextDetails.length) { // fetch comments at content level
      const request = { tag : this.getTag(requestBody.context_details) } ;
      this.callReadCommentApi(request)
      .then(response => { 
        const sortedComments = this.sortComments(contextDetails, response.data.result);
        this.sendSuccess(req,res,{comments: sortedComments})
      })
      .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_READ", msg: error}));

    } else { // no results 
      this.sendSuccess(req,res,{comments: []})
    }
  }
  private callReadCommentApi(request){
      const requestBody = {
        request: request
      };
      return http.post(pluginBaseUrl + discussionReadUrl,requestBody).toPromise();
  }
  private sortComments(contextDetails, commentList){
    const threadObj = contextDetails.reduce((acc, cur) =>{
        acc[cur.thread_id] = cur; 
        return acc
      }, {});
    commentList.forEach(element => {
      if(threadObj[element.thread_id]){
        element.stage_id = threadObj[element.thread_id].stage_id;
      }
    });
    return commentList;
  }
  public async deleteComments(req: Request, res: Response) {
    const requestBody = _.pick(req.body.request, ["context_details"]);
    const searchOptions = {
      method: requestBody.context_details.stage_id ? 'findOne' : 'findAll'
    }
    const contextDetails = await this.getContextFromDb(requestBody.context_details,searchOptions).catch(err => Promise.resolve({}));

    if(requestBody.context_details.stage_id  && _.get(contextDetails, "thread_id")){ // fetch comments at stage level

      const request = { thread_id : _.get(contextDetails, "thread_id")};
      this.callDeleteCommentApi(request)
      .then(response => this.sendSuccess(req,res,{deleted: "OK"}))
      .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_DELETE", msg: error}));

    } else if (!requestBody.context_details.stage_id && contextDetails.length) { // fetch comments at content level
      const request = { tag: this.getTag(requestBody.context_details)};
      this.callDeleteCommentApi(request)
      .then(response => this.sendSuccess(req,res,{deleted: "OK"}))
      .catch(error => this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_DELETE", msg: error}));

    } else { // no results 
      this.sendSuccess(req,res,{deleted: "OK"})
    }
  }
  private callDeleteCommentApi(request){
      const requestBody = {
        request: request
      };
      return http.post(pluginBaseUrl + discussionDeleteUrl,requestBody).toPromise();
  }
  private sendSuccess(req, res, data){
    res.status(200)
    .send(new ReviewResponse(undefined, {
      id: 'api.review.comment',
      data: data
    }))
    telemetryHelper.log(req);
  }
  private sendError(req,res,error){
    res.status(500)
    .send(new ReviewResponse({
      id: "api.review.comment",
      err: error.code || "ERR_REVIEW_COMMENT",
      errmsg: error.msg || "error"
    }));
    telemetryHelper.error(req, res, error);
  }
  private getTag(context_details){
    return `${context_details.content_id}_${context_details.content_ver}_${context_details.content_type}`
  }
}
