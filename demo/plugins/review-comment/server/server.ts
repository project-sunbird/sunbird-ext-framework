import { Manifest,BaseServer} from "@project-sunbird/ext-framework-server/models";
import { Request, Response } from "express";
import { ReviewResponse } from "./models";
import * as _ from "lodash";
import { telemetryHelper } from "./telemetryHelper";
import { HTTPService as http } from "@project-sunbird/ext-framework-server/services";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { logger } from '@project-sunbird/ext-framework-server/logger';
const pluginBaseUrl = process.env.sunbird_ext_plugin_url || 'https://staging.open-sunbird.org/plugin/'; // should be taken form env variable
const discussionCreateUrl = "discussion/v1/create/post";
const discussionReadUrl = "discussion/v1/read/post";
const discussionDeleteUrl = "discussion/v1/delete/post";

export class Server extends BaseServer {

  constructor(manifest: Manifest) {
    super(manifest);
  }

  public async createComment(req: Request, res: Response) {
    const toSnakeCase = this.toSnakeCase(req.body.request);
    toSnakeCase.context_details = this.toSnakeCase(toSnakeCase.context_details);
    const requestBody = _.pick(toSnakeCase, [ "context_details", "body", "created_on", "user_id", "user_info"]);
    const contextDetails = await this.getContextFromDb(requestBody.context_details,{ method: 'findOne'}).catch(error => Promise.resolve({}));
    const threadId = _.get(contextDetails, "thread_id");

    if (threadId) {
      this.callCreatePostApi(requestBody, threadId)
      .then(response => this.sendSuccess(req,res,{created: "OK"}))
      .catch(error => {
        logger.error('callCreatePostApi failed when thread was found in db',requestBody, error);
        this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error})
      });
    } else {
      this.callCreatePostApi(requestBody)
      .then(response => {
          this.saveContextDetails(requestBody, _.get(response, 'data.result.thread_id'))
          .then(data => this.sendSuccess(req,res,{created: "OK"}))
          .catch(error => { 
            logger.error('saveContextDetails to db failed after callCreatePostApi returned success when thread was found in db', requestBody, _.get(response, 'data.result.thread_id'), error);
            this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error})
          });
        })
        .catch(error => {
          logger.error('callCreatePostApi failed when thread not found in db',requestBody, error);
          this.sendError(req, res, {code:"ERR_REVIEW_COMMENT_CREATE", msg: error})
        })
    }
  }

  private async getContextFromDb(context_details, options = { method: 'findAll'}) {
    const query: any = {
      content_id: context_details.content_id,
  		content_type: context_details.content_type,
  		content_ver: context_details.content_ver,
      is_deleted: false
    }

    if(context_details.stage_id) query.meta_data = { $contains: {'stage_id': context_details.stage_id}}

    if(options.method === 'findOne'){
      return this.cassandra.instance.context_details.findOneAsync(query, {raw:true, allow_filtering: true});
    } else {
      return this.cassandra.instance.context_details.findAsync(query, {raw:true, allow_filtering: true});
    }
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
      return http.post(pluginBaseUrl + discussionCreateUrl,disData)
      .pipe(catchError(error => throwError(_.get(error, 'response.data.params.errmsg')))).toPromise()
  }

  private async saveContextDetails(requestBody, thread_id){
      const insertObj: any = {
          thread_id: thread_id,
          content_id: requestBody.context_details.content_id,
          content_ver: requestBody.context_details.content_ver,
          content_type: requestBody.context_details.content_type
        };
      if(requestBody.context_details.stage_id){
          insertObj.meta_data = { stage_id: requestBody.context_details.stage_id };
      }
      const model = new this.cassandra.instance.context_details(insertObj);
      return model.saveAsync();
  }

  public async getCommentList(req: Request, res: Response) {
    const toSnakeCase = this.toSnakeCase(req.body.request);
    toSnakeCase.context_details = this.toSnakeCase(toSnakeCase.context_details);
    const requestBody = _.pick(toSnakeCase, ["context_details"]);
    const contextDetails = await this.getContextFromDb(requestBody.context_details).catch(err => Promise.resolve({}));

    if(contextDetails.length){
      let request;

      if(contextDetails.length === 1) request = {thread_id: _.get(contextDetails[0], "thread_id")};
      else request = { tag : this.getTag(requestBody.context_details)};

      this.callReadCommentApi(request)
      .then(response => this.sendSuccess(req,res,{comments: this.sortComments(contextDetails, _.get(response, 'data.result'))}))
      .catch(error => { 
        logger.error('callReadCommentApi failed when thread not found in db',requestBody, error);
        this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_READ", msg: error})
      });

    } else { // no results 
      this.sendSuccess(req,res,{comments: []})
    }
  }

  private callReadCommentApi(request){
      const requestBody = {
        request: request
      };
      return http.post(pluginBaseUrl + discussionReadUrl,requestBody)
      .pipe(catchError(error => throwError(_.get(error, 'response.data.params.errmsg')))).toPromise()
  }

  private sortComments(contextDetails, commentList){
    const threadObj = contextDetails.reduce((accumulator, current) => {
        accumulator[current.thread_id] = current; 
        return accumulator
      }, {});
    if(!commentList) return []; 
    return commentList.map(element => {
      if(threadObj[element.thread_id]) element.stageId = threadObj[element.thread_id].meta_data.stage_id;
      return this.toCamelCase(element)
    });
  }

  public async deleteComments(req: Request, res: Response) {

    const toSnakeCase = this.toSnakeCase(req.body.request);
    toSnakeCase.context_details = this.toSnakeCase(toSnakeCase.context_details);
    const requestBody = _.pick(toSnakeCase, ["context_details"]);
    const searchResults = await this.getContextFromDb(requestBody.context_details).catch(err => Promise.resolve({}));

    if(searchResults.length){ // fetch comments at stage level
      let request;

      if(searchResults.length === 1) request = {thread_id: _.get(searchResults[0], "thread_id")};
      else request = { tag : this.getTag(requestBody.context_details)};

      this.callDeleteCommentApi(request)
      .then(response => {
        this.deleteContextDetails(requestBody.context_details, searchResults)
        .then(data => this.sendSuccess(req,res,{deleted: "OK"}))
        .catch(error => { 
          logger.error(' deleteContextDetails failed after callDeleteCommentApi returned success',requestBody, error);
          this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_DELETE", msg: error});
        });
      })
      .catch(error => {
        logger.error(' deleteContextDetails failed',requestBody, error);
        this.sendError(req,res, {code:"ERR_REVIEW_COMMENT_DELETE", msg: error});
      });

    }  else { // no results 
      this.sendSuccess(req,res,{deleted: "OK"})
    }
  }

  private callDeleteCommentApi(request){
    const requestBody = {
      request: request
    };
    return http.delete(pluginBaseUrl + discussionDeleteUrl, { data: requestBody })
    .pipe(catchError(error => throwError(_.get(error, 'response.data.params.errmsg')))).toPromise();
  }

  private async deleteContextDetails(context_details, searchResults: Array<any>) {
    const query: any = {
      content_id: context_details.content_id,
  		content_type: context_details.content_type,
  		content_ver: context_details.content_ver,
    }
    const updateObject = { is_deleted: true };
    query.thread_id = { $in: searchResults.map(element => element.thread_id) };
    return this.cassandra.instance.context_details.updateAsync(query, updateObject)
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

  private toCamelCase(object){
    return _.mapKeys(object, _.rearg(_.camelCase, 1));
  }

  private toSnakeCase(object){
    return _.mapKeys(object, _.rearg(_.snakeCase, 1))
  }
}
