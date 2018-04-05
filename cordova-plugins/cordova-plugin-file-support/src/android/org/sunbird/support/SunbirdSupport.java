package org.sunbird.support;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;

/**
 * Created on 4/4/18.
 * shriharsh
 */
public class SunbirdSupport extends CordovaPlugin {

    private CallbackContext callbackContext;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (args.get(0).equals("makeEntryInSunbirdSupportFile")) {
            this.callbackContext = callbackContext;
            try {
                final String packageName = this.cordova.getActivity().getPackageName();
                PackageInfo packageInfo = this.cordova.getActivity().getPackageManager().getPackageInfo(packageName, 0);
                final String versionName = packageInfo.versionName;
                this.cordova.getThreadPool().execute(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            SunbirdFileHandler.makeEntryInSunbirdSupportFile(packageName, versionName);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
            } catch (PackageManager.NameNotFoundException e) {
                e.printStackTrace();
            }
        }
        return true;
    }
}



