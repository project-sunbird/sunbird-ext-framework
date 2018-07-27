/*
*
* @author Sunil A S<sunils@ilimi.in>
*
*/

import {
  ITelemetry, ITelemetryEvent, TelemetryObject,
  ITelemetryContextData, IEventData
} from './interfaces/TelemetryService';
import * as _ from 'lodash';
import { HTTPService } from '../http-service';
import { Singleton } from 'typescript-ioc';
/**
 * Telemetry Service to log telemetry v3 events
 * 
 * @class TelemetryService
 */

@Singleton
export class TelemetryService {

  private provider: any;

  private config: ITelemetry;

  /**
   * 
   * 
   * @param {ITelemetry} config 
   * @param {*} provider 
   * @memberof TelemetryService
   */
  public initialize(config: ITelemetry, provider: any) {
      this.provider = provider
      this.config = _.cloneDeep(config);
      config.dispatcher = config.dispatcher ? this.getDispatcher(config.dispatcher) : this.getDispatcher('console')
      provider.initialize(config);
      console.log('Telemetry Service is initialized!');
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public log(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.log(eventData.edata, eventData.options);
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public audit(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.audit(eventData.edata, eventData.options);
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public error(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.error(eventData.edata, eventData.options);
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public search(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.search(eventData.edata, eventData.options);
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public start(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.start(this.config, eventData.options.object.id, eventData.options.object.ver,
        eventData.edata, eventData.options);
  }
  /**
   * 
   * 
   * @param {IEventData} data 
   * @memberof TelemetryService
   */
  public end(data: IEventData): void {
      const eventData: ITelemetryEvent = this.getEventData(data);
      this.provider.end(eventData.edata, eventData.options);
  }

  private getRollUpData(data: Array<string> = []): Object {
    const rollUp = {};
    data.forEach((element, index) => rollUp['l' + index] = element);
    return rollUp;
  }

  private getEventData(event: IEventData): any {
    return {
      edata: event.edata,
      options: {
        context: this.getEventContext(event),
        object: this.getEventObject(event),
        actor: event.actor,
        tags: event.tags || []
      }
    };
  }

  private getEventObject(event: IEventData): TelemetryObject {
    if (_.get(event, 'object.id')) {
      return {
        id: _.get(event, 'object.id') || '',
        type: _.get(event, 'object.type') || '',
        ver: _.get(event, 'object.ver') || '',
        rollup: _.get(event, 'object.rollup') || {}
      };
    } 
  }

  private getEventContext(event: IEventData): ITelemetryContextData {
    return {
      channel: _.get(event, 'edata.channel') || this.config.channel,
      pdata: _.get(event, 'context.pdata') || this.config.pdata,
      env: _.get(event, 'env') || this.config.env,
      sid: _.get(event, 'sid') || this.config.sid,
      uid: this.config.uid,
      cdata: _.get(event, 'context.cdata') || [],
      // TODO: get rollup data from event
      rollup: this.getRollUpData() 
    };
  }

  private getDispatcher(type: string) {
    let dispatchers = {
      'console': {
        dispatch: event => {
          console.log('------TELEMETRY--LOG---------');
          console.log('EVENT: ', JSON.stringify(event));
        }
      },
      'http': {
        dispatch: event => {
          // TODO: config object for http service
          HTTPService.post( this.config.host + this.config.endpoint, JSON.stringify(event)).subscribe((result) => {
            // console.log(result)
          });
        }
      }
    };
    return dispatchers[type];
  }
}