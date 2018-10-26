import { frameworkAPI, IEventData, ILogEventData, IErrorEventData } from '@project-sunbird/ext-framework-server/api';
const ACTOR_ID = '382440a9-608f-4a89-a171-d0d46f48cbd0';

class TelemetryHelper {
  log(req) {
    const logEventSuccess = {
      'context': this.getContext(req),
      'actor': {
        'id': ACTOR_ID,
        'type': 'System'
      },
      'tags': [],
      'edata': this.getLogEdata(req)
    }
    frameworkAPI.telemetryService().log(logEventSuccess);
  }
  error(req, res, err) {
    const errorEventlog = {
      'context': this.getContext(req),
      'actor': {
        'id': ACTOR_ID,
        'type': 'System'
      },
      'edata': this.getErrorEdata(req, res, err)
    }
    frameworkAPI.telemetryService().error(errorEventlog);
  }
  getContext(req) {
    var context = {
      channel: req.get('X-Channel-Id') || '',
      env: 'form.service',
      did: req.get('X-Device-ID') || ''
    }
    return context
  }
  getLogEdata(req) {
    const params = [
      {'rid': 'form.service' },
      {'url': req.originalUrl },
      {'method': req.method }
    ]
    return {
      type: 'api_access',
      level: 'INFO',
      message: '',
      params: params
    }
  }
  getErrorEdata(req, res, err) {
    let error;
    try {
      error = { err: JSON.stringify(err), req: JSON.stringify(req.body)};
    } catch {
      error = "unhandled error, json stringify errored out";
    }
    return {
      err: res.statusCode.toString(),
      errtype: res.statusMessage,
      stacktrace: error,
    }
  }
}
const telemetryHelper = new TelemetryHelper();
export { telemetryHelper }
