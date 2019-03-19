import { IMetaDataProvider, PluginMeta } from "../interfaces";
import * as _ from 'lodash';
import { logger } from '../logger';
import { Singleton } from "typescript-ioc";

@Singleton
export class InMemoryMetaDataProvider implements IMetaDataProvider {

  private store: Object = {}
  public initialize(config?: any) {
    this.store = {}
  }

  public async getMeta(id: string): Promise<any> {
    await new Promise((resolve, reject) => {
      this.store[id] ? resolve({ rows: [this.store[id]] }) : reject(`Error while getting meta data for ${id}`)
    }).catch(error => {
      logger.error('error when getting meta data', error)
    })
  }

  public async updateMeta(id: string, meta: PluginMeta): Promise<any> {
    await new Promise((resolve, reject) => {
      let oldData = this.store[id];
      if (oldData) {
        this.store[id] = { ...oldData, ...meta }
        resolve(this.store[id])
      } else {
        reject(`Error while updating meta data for ${id}, it is not created`)
      }
    }).catch(error => {
      logger.error('error when updating meta data', error)
    })
  }

  public async createMeta(meta: PluginMeta): Promise<any> {
    await new Promise((resolve, reject) => {
      if (this.store[meta.id]) {
        reject('Error meta data already exists')
      } else {
        this.store[meta.id] = meta;
        resolve(meta.id)
      }
    }).catch(error => {
      logger.error('error when creating meta data', error)
    });
  }

  public async deleteMeta(id: string): Promise<any> {
    await new Promise((resolve, reject) => {
      if (!this.store[id]) {
        reject('Error meta data not exists')
      } else {
        delete this.store[id];
        resolve(id)
      }
    }).catch(error => {
      logger.error('error when deleting meta data', error)
    })
  }
}