
var telemetry = require("./telemetry");
var content = require("./content");
var auth = require("./auth");
var event = require("./event");
var downloadService = require("./downloadService");
var profile = require("./profile");
var course = require("./course");
var userProfile = require("./userprofile");
var pageAssemble = require("./pageAssemble");

var GenieSDK = {
  telemetry: telemetry,
  content: content,
  auth: auth,
  event: event,
  downloadService: downloadService,
  profile: profile,
  course: course,
  userProfile: userProfile,
  pageAssemble: pageAssemble
};


module.exports = GenieSDK;
