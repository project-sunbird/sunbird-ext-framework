var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var content = {

  getContentDetail: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getContentDetail", requestJson]);
  },

  importEcar: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["importEcar", requestJson]);
  },

  importContent: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["importContent", requestJson]);
  },

  searchContent: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["searchContent", requestJson]);
  },

 getAllLocalContents: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getAllLocalContents", requestJson]);
  },

  getChildContents: function(requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getChildContents", requestJson]);
  },

  action: function() {
    return "content";
  }
};

module.exports = content;
