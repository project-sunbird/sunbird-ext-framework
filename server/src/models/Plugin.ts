import { Manifest } from "./Manifest";
import { Framework } from "..";
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
    this.cassandra = Framework.api.getCassandraInstance(this.manifest.id);
    this.elasticsearch = Framework.api.getElasticsearchInstance(this.manifest.id);
  }
}