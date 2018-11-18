import { Manifest, BaseServer } from '@project-sunbird/ext-framework-server/models';
import { Request, Response } from 'express';
import { FormResponse } from './models';
import * as _ from 'lodash';
import { telemetryHelper } from './telemetryHelper';
export class Server extends BaseServer {

  constructor(manifest: Manifest) {
    super(manifest);
  }
  private convertToLowerCase(obj: Object, keys: Array<string>){
      keys.forEach(element => obj[element] = obj[element] && obj[element].toLowerCase());
  }
  public async create(req: Request, res: Response) {
    const data = _.pick(req.body.request, ['type', 'subType', 'action', 'rootOrgId', 'framework', 'data', 'component']);
    this.convertToLowerCase(data, ['type', 'subType', 'action']);
    const model = new this.cassandra.instance.form_data({
      root_org: data.rootOrgId,
      type: data.type,
      subtype: data.subType,
      action: data.action,
      component: data.component,
      framework: data.framework,
      data: JSON.stringify(data.data),
      created_on: new Date()
    })
    await model.saveAsync().then(data => {
      res.status(200)
        .send(new FormResponse(undefined, {
          id: 'api.form.create',
          data: {
            created: 'OK'
          }
        }))
        telemetryHelper.log(req);
    })
      .catch(error => {
        res.status(500)
          .send(new FormResponse({
            id: "api.form.create",
            err: "ERR_CREATE_FORM_DATA",
            errmsg: error
          }));
        telemetryHelper.error(req, res, error);
      })
  }

  public async update(req: Request, res: Response) {
    const data = _.pick(req.body.request, ['type', 'subType', 'action', 'rootOrgId', 'framework', 'data', 'component']);
    this.convertToLowerCase(data, ['type', 'subType', 'action']);
    let query = {
      root_org: data.rootOrgId || '*',
      framework: data.framework || '*',
      type: data.type,
      action: data.action,
      subtype: data.subType || '*',
      component: data.component || '*'
    };

    const updateValue = {
      data: JSON.stringify(data.data),
      last_modified_on: new Date()
    };
    
    await this.cassandra.instance.form_data.updateAsync(query, updateValue, { if_exists: true })
      .then(data => {
        if (!_.get(data, "rows[0].['[applied]']")) throw { msg: `invalid request, no records found for the match to update!`, client_error: true };
        res.status(200)
          .send(new FormResponse(undefined, {
            id: 'api.form.update',
            data: { "response": [{ "rootOrgId": query.root_org, "key": `${query.type}.${query.subtype}.${query.action}.${query.component}`, "status": "SUCCESS" }] }
          }))
        telemetryHelper.log(req);
      }).catch(error => {
        if (error.client_error) {
          res.status(500)
            .send(new FormResponse({
              id: "api.form.update",
              err: "ERR_UPDATE_FORM_DATA",
              responseCode: "CLIENT_ERROR",
              errmsg: error.msg
            }));
            telemetryHelper.error(req, res, error);
        } else {
          throw error;
        }
      })
      .catch(error => {
        res.status(404)
          .send(new FormResponse({
            id: "api.form.update",
            err: "ERR_UPDATE_FORM_DATA",
            errmsg: error
          }));
        telemetryHelper.error(req, res, error);
      })
  }
  private findForm(requestBody,formList){

    if (!formList.length) return {};

    const query: any = {
      type: requestBody.type,
      action: requestBody.action,
      subtype: requestBody.subType || '*',
      root_org: requestBody.rootOrgId || '*',
      framework: requestBody.framework || '*',
      component: requestBody.component || '*',
    }

    let form = _.find(formList, query);
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { root_org: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { framework: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { framework: "*", root_org: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { component: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { root_org: "*", component: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { framework: "*", component: "*" }));
    if(!_.isEmpty(form)) return form;

    form = _.find(formList, Object.assign({}, query, { framework: "*", root_org: "*", component: "*" }));
    if(!_.isEmpty(form)) return form;

    return form;
  }
  public async read(req: Request, res: Response) {
    const requestBody = _.pick(req.body.request, ['type', 'subType', 'action', 'rootOrgId', 'framework', 'data', 'component']);
    this.convertToLowerCase(requestBody, ['type', 'subType', 'action']);
    const query = {
      type: requestBody.type,
      action: requestBody.action,
      subtype: requestBody.subType || '*'
    }
    this.cassandra.instance.form_data.findAsync(query, { raw: true, allow_filtering: true })
    .then(data => {
      let formData: any = this.findForm(requestBody, data);
      if (_.isEmpty(formData)) throw "form not found";
      if (_.get(formData, 'root_org')) {
        formData.rootOrgId = formData.root_org;
        formData = _.omit(formData, ['root_org']);
      }
      res.status(200)
        .send(new FormResponse(undefined, {
          id: 'api.form.read',
          data: {
            form: formData
          }
        }))
        telemetryHelper.log(req);
    })
    .catch(error => {
      console.log(error);
      res.status(404)
        .send(new FormResponse({
          id: "api.form.read",
          err: "ERR_READ_FORM_DATA",
          errmsg: error
        }));
      telemetryHelper.error(req, res, error);
    })
  }
}