import * as Joi from 'joi';
import { ReviewResponse } from '../models';
import { telemetryHelper } from '../telemetryHelper';

export class RequestValidator {

  public validateCreateProgramAPI(req, res, next) {
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        config: Joi.object().min(1).required(),
        startDate: Joi.string().required(),
        endDate: Joi.string(),
        defaultRoles: Joi.array().items(Joi.string()).required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.create.program",
        err: "ERR_CREATE_PROGRAM",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
  validateReadProgramAPI(req, res, next){
    const schema = Joi.object().keys({
      programId: Joi.string().required()
    });
    const { error, value } = Joi.validate(req.params, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.read.program",
        err: "ERR_READ_PROGRAM",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
  public validateUpdateProgramAPI(req, res, next) {
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        programId: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
        type: Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        config: Joi.object().min(1),
        defaultRoles: Joi.array().items(Joi.string())
      }).min(2).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.update.program",
        err: "ERR_UPDATE_PROGRAM",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
  validateDeleteProgramAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        programId: Joi.string().required()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.delete.program",
        err: "ERR_DELETE_PROGRAM",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
  validateAddParticipantAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        programId: Joi.string().required(),
        userId: Joi.string().required(),
        roles: Joi.array().items(Joi.string()),
        onBoardingData: Joi.object(),
        onBoarded: Joi.boolean()
      }).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.add.participants",
        err: "ERR_ADD_PARTICIPANTS",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
  validateUpdateParticipantAPI(req, res, next){
    const schema = Joi.object().keys({
      request: Joi.object().keys({
        programId: Joi.string().required(),
        userId: Joi.string().required(),
        roles: Joi.array().items(Joi.string()),
        onBoardingData: Joi.object(),
        onBoarded: Joi.boolean()
      }).min(1).required()
    });
    const { error, value } = Joi.validate(req.body, schema, {abortEarly: false});
    if (error) {
      res.status(400)
      .send(new ReviewResponse({
        id: "api.update.participants",
        err: "ERR_UPDATE_PARTICIPANTS",
        errmsg: error.details.map(d => d.message),
        responseCode: "CLIENT_ERROR"
      }));
      telemetryHelper.error(req, res, error);
    } else {
      next()
    }
  }
}