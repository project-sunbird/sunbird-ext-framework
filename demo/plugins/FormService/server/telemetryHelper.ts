import { frameworkAPI, IEventData, ILogEventData, IErrorEventData } from 'ext-framework-server/api';
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
      did: req.get('X-Device-ID') || '',
      pdata: {
        'id': process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.form.service',
        'ver': '1.0',
        'pid': process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.form.service'
      },

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
    return {
      err: res.statusCode,
      errtype: res.statusMessage,
      stacktrace: JSON.stringify(err),
    }
  }
}
const telemetryHelper = new TelemetryHelper();
export { telemetryHelper }
