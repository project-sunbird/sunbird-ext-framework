var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var profile = {

  createProfile: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["createProfile", requestJson]);
  },

  setCurrentUser: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["setCurrentUser", requestJson]);
  },

  action: function () {
    return "profile";
  }

};

module.exports = profile;

