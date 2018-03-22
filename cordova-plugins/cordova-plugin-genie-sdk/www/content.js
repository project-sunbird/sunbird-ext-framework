var exec = require('cordova/exec');

var PLUGIN_NAME = 'GenieSDK';

var content = {

  getContentDetail: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getContentDetail", requestJson]);
  },

  importEcar: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["importEcar", requestJson]);
  },

  importContent: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["importContent", requestJson]);
  },

  searchContent: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["searchContent", requestJson]);
  },

  getAllLocalContents: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getAllLocalContents", requestJson]);
  },

  getChildContents: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getChildContents", requestJson]);
  },

  deleteContent: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["deleteContent", requestJson]);
  },

  getImportStatus: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getImportStatus", requestJson]);
  },

  cancelDownload: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["cancelDownload", requestJson]);
  },

  exportContent: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["exportContent", requestJson]);
  },

  setDownloadAction: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["setDownloadAction", requestJson]);
  },

  getDownloadState: function (requestJson, success, error) {
    exec(success, error, PLUGIN_NAME, this.action(), ["getDownloadState", requestJson]);
  },

  action: function () {
    return "content";
  }
};

module.exports = content;
