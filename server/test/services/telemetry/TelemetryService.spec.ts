import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import * as telemetry from '../../../libs/telemetry-1.0.min.js';
import { TelemetryService, ITelemetry, IEventData, IStartEventData } from '../../../src/services/telemetry';
chai.should();

describe('Telemetry Service', () => {
  let telemetryService: TelemetryService;
  let config: ITelemetry;
  before(() => {
    config = {
      'pdata': { 'id': 'test', 'ver': '1.0.0', 'pid': 'test.extensible.framework' },
      'env': 'test-extensible-framework-server',
      'apislug': '',
      'channel': 'org.sunbird',
      'endpoint': '',
      'uid': '336',
      'did': '34534-345231-65757-123123',
      'sid': '234234-234234-234234-345345',
      'runningEnv': 'server',
      'tags': [],
      'cdata': [{}],
      'dispatcher': 'console'
    };
    telemetryService = new TelemetryService(config, telemetry);
  })

  it('should be initialized', () => {
    // tslint:disable-next-line:no-unused-expression
    telemetryService.should.not.be.undefined;
  })

  it('should log "log" event', () => {
    let logEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata': { 'type': 'debug', 'level': '1', 'message': 'this is log message' }
    };
    Sinon.spy(telemetry, 'log');
    telemetryService.log(logEvent);
    Sinon.assert.calledOnce(telemetry.log);
  })

  it('should log "audit" event', () => {
    let auditEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata': { "props": ["contentId"], "state": 'UPDATED', "prevstate": 'CREATED' }
    };
    Sinon.spy(telemetry, 'audit');
    telemetryService.audit(auditEvent);
    Sinon.assert.calledOnce(telemetry.audit);
  })

  it('should log "start" event', () => {
    let startEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata': { "type": 'portal', "loc": "ip address", "mode": "Session", "duration": 1231389132 }
    };
    Sinon.spy(telemetry, 'start');
    telemetryService.start(startEvent);
    Sinon.assert.calledOnce(telemetry.start);
  })

  it('should log "end" event', () => {
    let endEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata': { 'pageid': '1', 'duration': '345345345', 'type': 'portal' }
    };
    Sinon.spy(telemetry, 'end');
    telemetryService.end(endEvent);
    Sinon.assert.calledOnce(telemetry.end);
  })

  it('should log "error" event', () => {
    let errorEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata': { err: 'test error message', errtype: 'portal plugin', stacktrace: JSON.stringify(new Error('test error'))}
    };
    Sinon.spy(telemetry, 'error');
    telemetryService.error(errorEvent);
    Sinon.assert.calledOnce(telemetry.error);
  })

  it('should log "share" event', () => {
    let searchEvent: IEventData = {
      'context': { 'env': 'test', 'cdata': [{}], },
      'object': { 'id': '3456345', 'type': '', 'ver': '1.0', 'rollup': {}, },
      'edata':  { "type": "content search", "query": "contentId", "filters": { grade: [1,2,3,4] }, "size": 3, "topn": [{}] } 
    };
    Sinon.spy(telemetry, 'search');
    telemetryService.search(searchEvent);
    Sinon.assert.calledOnce(telemetry.search);
  })
})