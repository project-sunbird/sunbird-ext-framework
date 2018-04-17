package org.genie;

import android.content.pm.PackageManager;
import android.util.SparseArray;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.ekstep.genieservices.GenieService;
import org.ekstep.genieservices.commons.IResponseHandler;
import org.ekstep.genieservices.commons.bean.GenieResponse;
import org.ekstep.genieservices.commons.bean.SyncStat;
import org.ekstep.genieservices.commons.bean.telemetry.Impression;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

/**
 * Created by souvikmondal on 8/1/18.
 */

public class GenieSDK extends CordovaPlugin {



    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        GenieService.init(cordova.getActivity(), "org.sunbird.app");
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("telemetry")) {
            TelemetryHandler.handle(args, callbackContext);
        } else if (action.equals("content")) {
            ContentHandler.handle(args, callbackContext);
        } else if (action.equals("auth")) {
            AuthHandler.handle(args, callbackContext);
        } else if (action.equals("event")) {
            GenieEventHandler.handle(args, callbackContext);
        } else if (action.equals("profile")) {
            ProfileHandler.handle(args, callbackContext);
        } else if (action.equals("course")) {
            CourseHandler.handle(args, callbackContext);
        } else if (action.equals("userProfile")) {
            UserProfileHandler.handle(args, callbackContext);
        } else if (action.equals("pageAssemble")) {
            PageHandler.handle(args, callbackContext);
        } else if (action.equals("permission")) {
            PermissionHandler.handle(this, args, callbackContext);
        } else if (action.equals("announcement")){
            AnnouncementHandler.handle(args, callbackContext);
        }
        return true;
    }


    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        super.onRequestPermissionResult(requestCode, permissions, grantResults);
        PermissionHandler.onPermissionResult(requestCode, permissions, grantResults);
    }
}
