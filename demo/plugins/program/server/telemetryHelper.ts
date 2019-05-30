import { frameworkAPI, IEventData, ILogEventData, IErrorEventData } from '@project-sunbird/ext-framework-server/api';
import * as _  from 'lodash';
const ACTOR_ID = '382440a9-608f-4a89-a171-d0d46f48cbd0';

class TelemetryHelper {
  log(req) {
    const tags = [];
    if(req.get('x-org-code')) tags.push(req.get('x-org-code'));
    const logEventSuccess = {
      'context': this.getContext(req),
      'actor': {
        'id': ACTOR_ID,
        'type': 'System'
      },
      'tags': tags,
      'edata': this.getLogEdata(req)
    }
    frameworkAPI.telemetryService().log(logEventSuccess);
  }
  error(req, res, err) {
    const tags = [];
    if(req.get('x-org-code')) tags.push(req.get('x-org-code'));
    const errorEventlog = {
      'context': this.getContext(req),
      'actor': {
        'id': ACTOR_ID,
        'type': 'System'
      },
      'tags': tags,
      'edata': this.getErrorEdata(req, res, err)
    }
    frameworkAPI.telemetryService().error(errorEventlog);
  }
  getContext(req) {
    var context = {
      channel: req.get('X-Channel-Id') || '',
      env: 'review-comment',
      did: req.get('X-Device-ID') || ''
    }
    return context
  }
  getLogEdata(req) {
    const params = [
      {'rid': 'review-comment' },
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
      err: _.toString(_.get(res, 'statusCode')) || "",
      errtype: res.statusMessage,
      stacktrace: error,
    }
  }
}
const telemetryHelper = new TelemetryHelper();
export { telemetryHelper }
