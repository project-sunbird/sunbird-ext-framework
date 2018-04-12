package org.genie;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.apache.cordova.CallbackContext;
import org.ekstep.genieservices.GenieService;
import org.ekstep.genieservices.commons.IResponseHandler;
import org.ekstep.genieservices.commons.bean.EndorseOrAddSkillRequest;
import org.ekstep.genieservices.commons.bean.FileUploadResult;
import org.ekstep.genieservices.commons.bean.GenieResponse;
import org.ekstep.genieservices.commons.bean.Profile;
import org.ekstep.genieservices.commons.bean.ProfileVisibilityRequest;
import org.ekstep.genieservices.commons.bean.TenantInfo;
import org.ekstep.genieservices.commons.bean.TenantInfoRequest;
import org.ekstep.genieservices.commons.bean.UploadFileRequest;
import org.ekstep.genieservices.commons.bean.UserProfile;
import org.ekstep.genieservices.commons.bean.UserProfileDetailsRequest;
import org.ekstep.genieservices.commons.bean.UserProfileSkill;
import org.ekstep.genieservices.commons.bean.UserProfileSkillsRequest;
import org.ekstep.genieservices.commons.bean.UserSearchCriteria;
import org.ekstep.genieservices.commons.bean.UserSearchResult;
import org.ekstep.genieservices.commons.utils.GsonUtil;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by souvikmondal on 6/3/18.
 */

public class ProfileHandler {

    private static final String TYPE_CREATE_PROFILE = "createProfile";
    private static final String TYPE_SET_CURRENT_USER = "setCurrentUser";

    public static void handle(JSONArray args, final CallbackContext callbackContext) {
        try {
            String type = args.getString(0);
            if (type.equals(TYPE_CREATE_PROFILE)) {
                createProfile(args, callbackContext);
            } else if (type.equals(TYPE_SET_CURRENT_USER)) {
                setCurrentUser(args, callbackContext);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * create profile
     */
    private static void createProfile(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);
        Profile request = GsonUtil.fromJson(requestJson, Profile.class);

        GenieService.getAsyncService().getUserService().createUserProfile(request, new IResponseHandler<Profile>() {
            @Override
            public void onSuccess(GenieResponse<Profile> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<Profile> genieResponse) {
                callbackContext.error(genieResponse.getError());
            }
        });
    }

    /**
     * set current user
     */
    private static void setCurrentUser(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String uid = args.getString(1);

        GenieService.getAsyncService().getUserService().setCurrentUser(uid, new IResponseHandler<Void>() {
            @Override
            public void onSuccess(GenieResponse<Void> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<Void> genieResponse) {
                callbackContext.error(genieResponse.getError());
            }
        });
    }

}
