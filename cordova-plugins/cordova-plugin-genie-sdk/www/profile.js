var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var profile = {

  getProfileById: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getProfileById", requestJson]);
  },

  createProfile: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["createProfile", requestJson]);
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
    return "profile";
  }

};

module.exports = profile;

