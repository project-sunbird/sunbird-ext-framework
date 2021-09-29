const mapping = { 'config_usertype_v2_app': { type: 'config', subType: 'userType_v2_ios' } };

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description Middleware is responsible to modify Form API Calls for the IOS Platform
 */
const IOSFormMiddleware = (req, res, next) => {
  const platform = req.get('X-Platform-Id');
  if (platform && typeof (platform) == 'string' && platform.toLowerCase() === 'ios') {
    const { body } = req;
    if (body && body.request) {
      const { type, subType, component } = body.request;
      const key = `${type}_${subType}_${component}`.toLowerCase();
      const hasMapping = key in mapping;
      if (hasMapping) {
        req.body.request = {
          ...req.body.request,
          ...mapping[key]
        }
      }
    }
  }
  next();
}

export { IOSFormMiddleware }