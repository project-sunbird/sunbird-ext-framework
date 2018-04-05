/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

package org.sunbird;

import android.app.Dialog;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.Display;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class SplashScreen extends CordovaPlugin {

    private static final String LOG_TAG = "SplashScreen";
    private static final int DEFAULT_SPLASHSCREEN_DURATION = 3000;
    private static final int DEFAULT_FADE_DURATION = 500;
    private static Dialog splashDialog;
    private ImageView splashImageView;
    private int orientation;

    // Helper to be compile-time compatible with both Cordova 3.x and 4.x.
    private View getView() {
        try {
            return (View)webView.getClass().getMethod("getView").invoke(webView);
        } catch (Exception e) {
            return (View)webView;
        }
    }

    private int getSplashId() {
        int drawableId = 0;
        String splashResource = "screen";
        drawableId = cordova.getActivity().getResources().getIdentifier(splashResource, "drawable", cordova.getActivity().getClass().getPackage().getName());
        if (drawableId == 0) {
            drawableId = cordova.getActivity().getResources().getIdentifier(splashResource, "drawable", cordova.getActivity().getPackageName());
        }
        return drawableId;
    }

    @Override
    protected void pluginInitialize() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getView().setVisibility(View.INVISIBLE);
            }
        });
        // Save initial orientation.
        orientation = cordova.getActivity().getResources().getConfiguration().orientation;
        displaySplashScreen();
    }

    private int getFadeDuration () {
        return DEFAULT_FADE_DURATION;
    }

    @Override
    public void onPause(boolean multitasking) {
        this.hideSplashScreen(true);
    }

    @Override
    public void onDestroy() {
        this.hideSplashScreen(true);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("hide")) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    webView.postMessage("splashscreen", "hide");
                }
            });
        } else if (action.equals("show")) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    webView.postMessage("splashscreen", "show");
                }
            });
        } else if (action.equals("setContent")) {
            String appName = args.getString(0);
            String logoUrl = args.getString(1);
        } else {
            return false;
        }

        callbackContext.success();
        return true;
    }

    @Override
    public Object onMessage(String id, Object data) {
        if ("splashscreen".equals(id)) {
            if ("hide".equals(data.toString())) {
                this.hideSplashScreen(false);
                getView().setVisibility(View.VISIBLE);
            } else if ("show".equals(data.toString())) {
                this.displaySplashScreen();
            }
        }
        return null;
    }

    // Don't add @Override so that plugin still compiles on 3.x.x for a while
    public void onConfigurationChanged(Configuration newConfig) {
        if (newConfig.orientation != orientation) {
            orientation = newConfig.orientation;

            // Splash drawable may change with orientation, so reload it.
            if (splashImageView != null) {
                int drawableId = getSplashId();
                if (drawableId != 0) {
                    splashImageView.setImageDrawable(cordova.getActivity().getResources().getDrawable(drawableId));
                }
            }
        }
    }

    private void hideSplashScreen(final boolean forceHideImmediately) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                if (splashDialog != null) {
                    splashDialog.dismiss();
                    splashDialog = null;
                    splashImageView = null;
                }

            }
        });
    }


    /**
     * Shows the splash screen over the full Activity
     */
    @SuppressWarnings("deprecation")
    private void displaySplashScreen() {
        final int splashscreenTime = DEFAULT_SPLASHSCREEN_DURATION;
        final int drawableId = getSplashId();

        final int fadeSplashScreenDuration = getFadeDuration();
        final int effectiveSplashDuration = Math.max(0, splashscreenTime - fadeSplashScreenDuration);

        // Prevent to show the splash dialog if the activity is in the process of finishing
        if (cordova.getActivity().isFinishing()) {
            return;
        }
        // If the splash dialog is showing don't try to show it again
        if (splashDialog != null && splashDialog.isShowing()) {
            return;
        }

        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                // Get reference to display
                Display display = cordova.getActivity().getWindowManager().getDefaultDisplay();
                Context context = webView.getContext();
                int splashDim = display.getWidth() < display.getHeight() ? display.getWidth() : display.getHeight();

                LinearLayout splashContent = createParentContentView(context);

                createLogoImageView(context, splashDim, drawableId);
                TextView appNameTextView = createAppNameView(context);

                splashContent.addView(splashImageView);
                splashContent.addView(appNameTextView);

                // Create and show the dialog
                splashDialog = new Dialog(context, android.R.style.Theme_Translucent_NoTitleBar);
                // check to see if the splash screen should be full screen
                if ((cordova.getActivity().getWindow().getAttributes().flags & WindowManager.LayoutParams.FLAG_FULLSCREEN)
                        == WindowManager.LayoutParams.FLAG_FULLSCREEN) {
                    splashDialog.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                            WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }
                splashDialog.setContentView(splashContent);
                splashDialog.setCancelable(false);
                splashDialog.show();

            }
        });
    }

    @NonNull
    private TextView createAppNameView(Context context) {
        TextView appNameTextView = new TextView(context);
        LinearLayout.LayoutParams textViewParam = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        textViewParam.setMargins(10, 30, 10, 10);
        appNameTextView.setText("SUNBIRD");
        appNameTextView.setTextSize(30);
        appNameTextView.setTextColor(Color.BLACK);
        appNameTextView.setGravity(Gravity.CENTER_HORIZONTAL);
        appNameTextView.setLayoutParams(textViewParam);
        return appNameTextView;
    }

    private void createLogoImageView(Context context, int splashDim, int drawableId) {
        splashImageView = new ImageView(context);
        splashImageView.setImageResource(drawableId);
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(splashDim, splashDim);
        layoutParams.setMargins(10, splashDim/4, 10, 0);
        splashImageView.setLayoutParams(layoutParams);


        splashImageView.setMinimumHeight(splashDim);
        splashImageView.setMinimumWidth(splashDim);

        // TODO: Use the background color of the webView's parent instead of using the preference.

        splashImageView.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
    }

    @NonNull
    private LinearLayout createParentContentView(Context context) {
        LinearLayout splashContent = new LinearLayout(context);
        splashContent.setOrientation(LinearLayout.VERTICAL);
        splashContent.setBackgroundColor(Color.WHITE);
        LayoutParams parentParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        splashContent.setLayoutParams(parentParams);
        return splashContent;
    }

}
