import { Manifest,BaseServer} from "@project-sunbird/ext-framework-server/models";
import { Request, Response } from "express";
import { ReviewResponse } from "./models";
import * as _ from "lodash";
import { telemetryHelper } from "./telemetryHelper";
import { HTTPService as http } from "@project-sunbird/ext-framework-server/services";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { logger } from '@project-sunbird/ext-framework-server/logger';
const uuid = require("uuid/v1");

export class Server extends BaseServer {

  constructor(manifest: Manifest) {
    super(manifest);
  }

  public async createProgram(req: Request, res: Response) {
    const insertObj: any = req.body.request;
    insertObj.programId = uuid();
    insertObj.config = insertObj.config ? JSON.stringify(insertObj.config) : "";
    if(req.body.request.endDate){
      insertObj.endDate = req.body.request.endDate
    }
    const model = new this.cassandra.instance.program(insertObj);
    await model.saveAsync({if_not_exist: true}).then(data => {
      this.sendSuccess(req,res, 'api.program.create', { created: "OK", programId: insertObj.programId })
    }).catch(error => {
      logger.error('create Program failed to save data', req.body.request, error);
      this.sendError(req,res, 'api.program.create', { code:"ERR_CREATE_PROGRAM", msg: error })
    });
  }
  public async readProgram(req: Request, res: Response) {
    let programDetails;
    try {
      programDetails = await this.cassandra.instance.program.findOneAsync(req.params, { raw:true });
      if(!programDetails){
        throw new Error('PROGRAM_NOT_EXIST');
      }
      if(req.query.userId){
        const reqQuery = { programId: req.params.programId, userId: req.query.userId }
        programDetails.userDetails = await this.cassandra.instance.participants.findOneAsync(reqQuery, { raw:true })
      }
      programDetails.config = JSON.parse(programDetails.config);
      this.sendSuccess(req, res, 'api.program.read', programDetails)
    } catch (error) {
      let errorCode = "ERR_READ_PROGRAM";
      if(error.message === 'PROGRAM_NOT_EXIST'){
        errorCode = 'PROGRAM_NOT_EXIST';
      }
      logger.error('read Program failed to query data', req.params, error);
      this.sendError(req, res, 'api.program.read', { code: errorCode, msg: error });
    }
  }
  public async updateProgram(req: Request, res: Response) {
    const updateQuery = { programId: req.body.request.programId };
    const updateValue = req.body.request;
    if(updateValue.config){
      updateValue.config = JSON.stringify(updateValue.config);
    }
    delete updateValue.programId;
    this.cassandra.instance.program.updateAsync(updateQuery, updateValue, { if_exists: true })
    .then(data => { // TODO: throw error if row dosnt exist
      this.sendSuccess(req,res, 'api.program.update', { updated: "OK", programId: req.body.request.programId })
    })
    .catch(error => {
      logger.error('update Program failed', req.params, error);
      this.sendError(req, res, 'api.program.update', { code:"ERR_UPDATE_PROGRAM", msg: error });
    })
  }

  public async deleteProgram(req: Request, res: Response) {
    const deleteQuery = { programId: req.body.request.programId };
    await this.cassandra.instance.program.deleteAsync(deleteQuery)
    .then(data => {
      this.sendSuccess(req,res, 'api.program.delete', { deleted: "OK", programId: req.body.request.programId })
    }).catch(error => {
      logger.error('delete Program failed', req.params, error);
      this.sendError(req, res, 'api.program.delete', { code:"ERR_DELETE_PROGRAM", msg: error });
    })
  }
  public async addParticipant(req: Request, res: Response) {
    const readQuery = { programId: req.body.request.programId };
    let programDetails, error;
    try {
      programDetails = await this.cassandra.instance.program.findOneAsync(readQuery, { raw:true });
    } catch(error) {
      logger.error('Add participants failed while fetching program details', req.body.request, error);
      error = error;
    }
    if(!_.isEmpty(programDetails)){
      const insertObj: any = req.body.request;
      insertObj.roles = req.body.request.roles || programDetails.defaultRoles;
      const model = new this.cassandra.instance.participants(insertObj);
      await model.saveAsync({if_not_exist: true}).then(data => {
        this.sendSuccess(req,res, 'api.add.participants', { created: "OK", programId: insertObj.programId })
      }).catch(error => {
        logger.error('Add participants failed to add user to database', req.body.request, error);
        this.sendError(req,res, 'api.add.participants', { code:"ERR_ADD_PARTICIPANTS", msg: error })
      });
    } else {
      this.sendError(req,res, 'api.add.participants', { code:"ERR_PROGRAM_NOT_EXIST", msg: error })
    }
  }

  public async updateParticipant(req: Request, res: Response) {
    const updateQuery = { programId: req.body.request.programId,  userId: req.body.request.userId };
    const updateValue = req.body.request;
    delete updateValue.programId;
    delete updateValue.userId;
    this.cassandra.instance.participants.updateAsync(updateQuery, updateValue, { if_exists: true })
    .then(data => { // TODO: throw error if row dosnt exist
      this.sendSuccess(req,res, 'api.update.participant', { updated: "OK", programId: req.body.request.programId })
    })
    .catch(error => {
      logger.error('update participants failed', req.params, error);
      this.sendError(req, res, 'api.update.participant', { code:"ERR_UPDATE_PARTICIPANTS", msg: error });
    })
  }


  private sendSuccess(req, res, id,  data){
    res.status(200)
    .send(new ReviewResponse(undefined, {
      id: id || 'api.program',
      data: data
    }))
    telemetryHelper.log(req);
  }

  private sendError(req, res,id, error){
    res.status(404)
    .send(new ReviewResponse({
      id: error.id || "api.program",
      err: error.code || "PROGRAM_API_ERROR",
      errmsg: error.msg || "internal error"
    }));
    telemetryHelper.error(req, res, error);
  }

}
