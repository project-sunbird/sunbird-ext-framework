var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var userprofile = {

  getUserProfileDetails: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getUserProfileDetails", requestJson]);
  },

  getTenantInfo: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getTenantInfo", requestJson]);
  },

  searchUser: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["searchUser", requestJson]);
  },

  getSkills: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getSkills", requestJson]);
  },

  endorseOrAddSkill: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["endorseOrAddSkill", requestJson]);
  },

  setProfileVisibility: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["setProfileVisibility", requestJson]);
  },

  uploadFile: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["uploadFile", requestJson]);
  },

  action: function () {
    return "userProfile";
  }

};

module.exports = userProfile;

