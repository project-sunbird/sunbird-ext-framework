import * as Joi from 'joi';
import { ReviewResponse } from '../models';
import { telemetryHelper } from '../telemetryHelper';

export class RequestValidator {

  public validateCreateCommentAPI(req, res, next) {
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        context_details: Joi.object({
          content_ver: Joi.string().required(),
          content_id: Joi.string().required(),
          content_type: Joi.string().required(),
          stage_id: Joi.string().required()
        }).required(),
        body: Joi.string().required(),
        user_id: Joi.string().required(),
        user_info: Joi.object().keys({
          name: Joi.string().required(),
          logo: Joi.string().required()
        }).required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.review.create.comment",
        err: "ERR_CREATE_COMMENT",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }

  validateReadCommentAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        context_details: Joi.object({
          content_ver: Joi.string().required(),
          content_id: Joi.string().required(),
          content_type: Joi.string().required(),
          stage_id: Joi.string()
        }).required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.review.read.comment",
        err: "ERR_READ_COMMENTS",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }

  validateDeleteCommentAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        context_details: Joi.object({
          content_ver: Joi.string().required(),
          content_id: Joi.string().required(),
          content_type: Joi.string().required(),
          stage_id: Joi.string()
        }).required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.review.delete.comment",
        err: "ERR_DELETE_COMMENTS",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
}