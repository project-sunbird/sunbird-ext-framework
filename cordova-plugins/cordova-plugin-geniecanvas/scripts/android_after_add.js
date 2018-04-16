module.exports = function (context) {
    var fs = require('fs');
    //deleting duplicate cordova files
    fs.unlinkSync("platforms/android/CordovaLib/src/org/apache/cordova/BuildHelper.java");
    fs.unlinkSync("platforms/android/CordovaLib/src/org/apache/cordova/PermissionHelper.java");
    //deleting duplicate keyboard plugin files
    fs.unlinkSync("platforms/android/src/io/ionic/keyboard/IonicKeyboard.java");
    //deleting duplicate device plugin files
    fs.unlinkSync("platforms/android/src/org/apache/cordova/device/Device.java");

    //update main activity
    fs.unlinkSync("platforms/android/src/org/sunbird/app/MainActivity.java");
    fs.createReadStream("plugins/cordova-plugin-geniecanvas/scripts/MainActivity.java").pipe(fs.createWriteStream("platforms/android/src/org/sunbird/app/MainActivity.java"));

    //rename config.xml for the app
    fs.renameSync("platforms/android/res/xml/config.xml", "platforms/android/res/xml/sunbird_config.xml");

    // try {
    //     //move the cordova js filrs and plugins for the app
    //     fs.renameSync("platforms/android/assets/www/cordova.js", "platforms/android/assets/www/sunbird/cordova.js");
    //     fs.renameSync("platforms/android/assets/www/cordova-js-src", "platforms/android/assets/www/sunbird/cordova-js-src");
    //     fs.renameSync("platforms/android/assets/www/cordova_plugins.js", "platforms/android/assets/www/sunbird/cordova_plugins.js");
    //     fs.renameSync("platforms/android/assets/www/plugins/", "platforms/android/assets/www/sunbird/plugins/"); 
    // } catch (error) {
    //     console.log(error);
    // }

    var rimraf = require('rimraf');
    //deleting file plugin duplicate dir
    rimraf("platforms/android/src/org/apache/cordova/file", function () {
        console.log("Deleted => platforms/android/src/org/apache/cordova/file");
    });
    //deleting filetransfer plugin duplicate dir
    rimraf("platforms/android/src/org/apache/cordova/filetransfer", function () {
        console.log("Deleted => platforms/android/src/org/apache/cordova/filetransfer");
    });
    //deleting inappbrowser plugin duplicate dir
    rimraf("platforms/android/src/org/apache/cordova/inappbrowser", function () {
        console.log("Deleted => platforms/android/src/org/apache/cordova/inappbrowser");
    });
    //deleting whitelist plugin duplicate dir
    rimraf("platforms/android/src/org/apache/cordova/whitelist", function () {
        console.log("Deleted => platforms/android/src/org/apache/cordova/whitelist");
    });
}