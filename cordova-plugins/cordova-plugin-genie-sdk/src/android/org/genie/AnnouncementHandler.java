package org.genie;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.apache.cordova.CallbackContext;
import org.ekstep.genieservices.GenieService;
import org.ekstep.genieservices.commons.IResponseHandler;
import org.ekstep.genieservices.commons.bean.Announcement;
import org.ekstep.genieservices.commons.bean.AnnouncementRequest;
import org.ekstep.genieservices.commons.bean.GenieResponse;
import org.ekstep.genieservices.commons.bean.ReceivedAnnouncementRequest;
import org.ekstep.genieservices.commons.bean.TenantInfoRequest;
import org.ekstep.genieservices.commons.bean.UserInboxAnnouncements;
import org.ekstep.genieservices.commons.bean.UserInboxRequest;
import org.ekstep.genieservices.commons.utils.GsonUtil;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by IndrajaMachani on 04/3/18.
 */

public class AnnouncementHandler {

    private static final String TYPE_GET_ANNOUNCEMENT_BY_ID = "getAnnouncementById";
    private static final String TYPE_USER_INBOX = "userInbox";
    private static final String TYPE_RECEIVED_ANNOUNCEMENT = "receivedAnnouncement";
    private static final String TYPE_READ_ANNOUNCEMENT = "readAnnouncement";

    public static void handle(JSONArray args, final CallbackContext callbackContext) {
        try {
            String type = args.getString(0);
            if (type.equals(TYPE_GET_ANNOUNCEMENT_BY_ID)) {
                getAnnouncementById(args, callbackContext);
            } else if (type.equals(TYPE_USER_INBOX)) {
                userInbox(args, callbackContext);
            } else if (type.equals(TYPE_RECEIVED_ANNOUNCEMENT)) {
                receivedAnnouncement(args, callbackContext);
            } else if (type.equals(TYPE_READ_ANNOUNCEMENT)) {
                readAnnouncement(args, callbackContext);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static void getAnnouncementById(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();
        TenantInfoRequest.Builder builder = gson.fromJson(requestJson, TenantInfoRequest.Builder.class);
        AnnouncementRequest.Builder request = GsonUtil.fromJson(requestJson, AnnouncementRequest.Builder.class);
        GenieService.getAsyncService().getAnnouncementService().getAnnouncementById(request, new IResponseHandler<Announcement>() {
            @Override
            public void onSuccess(GenieResponse<Announcement> genieResponse) {
                callbackContext.success(genieResponse.getResult());
            }

            @Override
            public void onError(GenieResponse<Announcement> genieResponse) {
                callbackContext.error(genieResponse.getError());
            }
        });
    }

    private static void userInbox(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();
        UserInboxRequest.Builder builder = gson.fromJson(requestJson,
                UserInboxRequest.Builder.class);

        GenieService.getAsyncService().getAnnouncementService().userInbox(builder.build(), new IResponseHandler<UserInboxAnnouncements>() {
            @Override
            public void onSuccess(GenieResponse<UserInboxAnnouncements> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<UserInboxAnnouncements> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    private static void receivedAnnouncement(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();
        ReceivedAnnouncementRequest.Builder builder = gson.fromJson(requestJson,
                ReceivedAnnouncementRequest.Builder.class);

        GenieService.getAsyncService().getAnnouncementService().receivedAnnouncement(builder.build(), new IResponseHandler<Void>() {
            @Override
            public void onSuccess(GenieResponse<Void> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<Void> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    private static void readAnnouncement(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();
        ReceivedAnnouncementRequest.Builder builder = gson.fromJson(requestJson,
                ReceivedAnnouncementRequest.Builder.class);

        GenieService.getAsyncService().getAnnouncementService().readAnnouncement(builder.build(), new IResponseHandler<Void>() {
            @Override
            public void onSuccess(GenieResponse<Void> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<Void> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

}
