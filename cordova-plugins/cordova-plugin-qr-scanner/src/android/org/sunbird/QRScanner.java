package org.sunbird;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.Gravity;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.zxing.ResultPoint;
import com.journeyapps.barcodescanner.BarcodeCallback;
import com.journeyapps.barcodescanner.BarcodeResult;
import com.journeyapps.barcodescanner.DecoratedBarcodeView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.List;

/**
 * @author vinayagasundar
 */
public class QRScanner extends CordovaPlugin {
    
    
    private static final String ACTION_QR_SCANNER = "qrScanner";

    private static final String START_SCANNING = "startScanner";
    private static final String STOP_SCANNING = "stopScanner";

    private Dialog mScanDialog = null;


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(ACTION_QR_SCANNER)) {
            String type = args.getString(0);
            
            switch (type) {
                case START_SCANNING:
                    cordova.getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            webView.postMessage(START_SCANNING, callbackContext);
                        }
                    });
                    break;
                    
                case STOP_SCANNING:
                    cordova.getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            webView.postMessage(STOP_SCANNING, callbackContext);
                        }
                    });
                    break;
            }
        }
        
        return true;
    }


    @Override
    public Object onMessage(String id, Object data) {
        if (START_SCANNING.equals(id)) {
            this.showScanDialog((CallbackContext) data);
        } else if (STOP_SCANNING.equals(id)) {
            this.stopScanner((CallbackContext) data);
        }
        
        return null;
    }

    private void showScanDialog(CallbackContext callbackContext) {
        stopScanner(null);
        
        if (cordova.getActivity().isFinishing()) {
            return;
        }
        
        
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Context context = webView.getContext();

                LinearLayout rootLayout = new LinearLayout(context);
                rootLayout.setOrientation(LinearLayout.VERTICAL);

                TextView textView = new TextView(context);

                LinearLayout.LayoutParams textLayoutParams =
                        new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                                0, 1);
                textView.setText("Hello");
                textView.setBackgroundColor(Color.WHITE);
                textView.setTextColor(Color.BLACK);
                textView.setGravity(Gravity.CENTER);
                textView.setLayoutParams(textLayoutParams);
                rootLayout.addView(textView);

                DecoratedBarcodeView decoratedBarcodeView = new DecoratedBarcodeView(context);
                LinearLayout.LayoutParams layoutParams =
                        new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                                0, 2);

                decoratedBarcodeView.decodeSingle(new BarcodeCallback() {
                    @Override
                    public void barcodeResult(BarcodeResult result) {
                        Log.i("QRScanner", "barcodeResult: " + result.getText());
                        decoratedBarcodeView.pause();
                        callbackContext.success(result.getText());
                    }

                    @Override
                    public void possibleResultPoints(List<ResultPoint> resultPoints) {

                    }
                });


                decoratedBarcodeView.setLayoutParams(layoutParams);

                rootLayout.addView(decoratedBarcodeView);

                mScanDialog = new Dialog(context, android.R.style.Theme_Translucent_NoTitleBar);

                if ((cordova.getActivity().getWindow().getAttributes().flags & WindowManager.LayoutParams.FLAG_FULLSCREEN)
                        == WindowManager.LayoutParams.FLAG_FULLSCREEN) {
                    mScanDialog.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                            WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }

                mScanDialog.setContentView(rootLayout);
                mScanDialog.setCancelable(false);

                mScanDialog.show();
                decoratedBarcodeView.resume();
            }
        });
    }


    private void stopScanner(CallbackContext callbackContext) {
        if (mScanDialog != null && mScanDialog.isShowing()) {
            mScanDialog.dismiss();
        }

        mScanDialog = null;

        if (callbackContext != null) {
            callbackContext.success();
        }
    }
}
