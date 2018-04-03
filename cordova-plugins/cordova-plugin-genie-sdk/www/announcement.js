var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var announcement = {

  getAnnouncementById: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getAnnouncementById", requestJson]);
  },

  userInbox: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["userInbox", requestJson]);
  },

  receivedAnnouncement: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["receivedAnnouncement", requestJson]);
  },

  readAnnouncement: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["readAnnouncement", requestJson]);
  },

  action: function () {
    return "announcement";
  }

};

module.exports = announcement;

