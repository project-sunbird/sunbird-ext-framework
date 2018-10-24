import * as Joi from 'joi';
import { DiscussionResponse } from '../models';
import { telemetryHelper } from '../telemetryHelper';

export class RequestValidator {

  public validateCreatePostAPI(req, res, next) {
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        thread_id: Joi.string(),
        body: Joi.string().required(),
        created_on: Joi.string(),
        user_id: Joi.string().required(),
        tag: Joi.string(),
        user_info: Joi.object().keys({
          name: Joi.string().required(),
          logo: Joi.string().required()
        }).required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new DiscussionResponse({
        id: "api.discussion.create.thread",
        err: "ERR_CREATE_THREAD",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }

  validateReadPostAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        thread_id: Joi.string(),
        tag: Joi.string()
      }).xor('thread_id', 'tag').required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new DiscussionResponse({
        id: "api.discussion.read.thread",
        err: "ERR_READ_THREAD",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }

  validateDeletePostAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        thread_id: Joi.string(),
        tag: Joi.string()
      }).xor('thread_id', 'tag').required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new DiscussionResponse({
        id: "api.discussion.delete.thread",
        err: "ERR_DELETE_THREAD",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }

}