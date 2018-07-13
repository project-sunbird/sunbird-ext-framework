import { Manifest } from "./Manifest";
import { frameworkAPI } from "../api";
import * as _ from 'lodash';

/**
 * @author Sunil A S <sunils@ilimi.in>
 */
/**
 * 
 * 
 * @export
 * @interface IPluginLifeCycleEvents
 */
export interface IPluginLifeCycleEvents {
    onLoad?();
    onUnload?();
    onStart?();
    onStop?();
};

export class BaseServer {
  protected cassandra: any;
  protected elasticsearch: any;
  protected manifest: Manifest;

  protected constructor(manifest: Manifest) {
    this.manifest = _.cloneDeep(manifest);
    this.cassandra = frameworkAPI.getCassandraInstance(this.manifest.id);
    this.elasticsearch = frameworkAPI.getElasticsearchInstance(this.manifest.id);
  }
}