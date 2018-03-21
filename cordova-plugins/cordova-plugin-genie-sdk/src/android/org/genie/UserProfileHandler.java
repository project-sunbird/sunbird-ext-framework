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
 * Created by IndrajaMachani on 19/3/18.
 */

public class UserProfileHandler {

    private static final String TYPE_GET_USER_PROFILE_DETAILS = "getUserProfileDetails";
    private static final String TYPE_CREATE_PROFILE = "createProfile";
    private static final String TYPE_GET_TENANT_INFO = "getTenantInfo";
    private static final String TYPE_SEARCH_USER = "searchUser";
    private static final String TYPE_GET_SKILLS = "getSkills";
    private static final String TYPE_ENDORSE_OR_ADD_SKILL = "endorseOrAddSkill";
    private static final String TYPE_SET_PROFILE_VISIBILITY = "setProfileVisibility";
    private static final String TYPE_UPLOAD_FILE = "uploadFile";

    public static void handle(JSONArray args, final CallbackContext callbackContext) {
        try {
            String type = args.getString(0);
            if (type.equals(TYPE_GET_USER_PROFILE_DETAILS)) {
                getUserProfileDetails(args, callbackContext);
            } else if (type.equals(TYPE_GET_TENANT_INFO)) {
                getTenantInfo(args, callbackContext);
            } else if (type.equals(TYPE_SEARCH_USER)) {
                searchUser(args, callbackContext);
            } else if (type.equals(TYPE_GET_SKILLS)) {
                getSkills(args, callbackContext);
            } else if (type.equals(TYPE_ENDORSE_OR_ADD_SKILL)) {
                endorseOrAddSkill(args, callbackContext);
            } else if (type.equals(TYPE_SET_PROFILE_VISIBILITY)) {
                setProfileVisibility(args, callbackContext);
            } else if (type.equals(TYPE_UPLOAD_FILE)) {
                uploadFile(args, callbackContext);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static void getUserProfileDetails(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);
        UserProfileDetailsRequest request = GsonUtil.fromJson(requestJson, UserProfileDetailsRequest.class);
        GenieService.getAsyncService().getUserProfileService().getUserProfileDetails(request, new IResponseHandler<UserProfile>() {
            @Override
            public void onSuccess(GenieResponse<UserProfile> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult().getUserProfile()));
            }

            @Override
            public void onError(GenieResponse<UserProfile> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    /**
     * get TenantInfo
     */
    private static void getTenantInfo(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        TenantInfoRequest.Builder builder = gson.fromJson(requestJson,
                TenantInfoRequest.Builder.class);

        GenieService.getAsyncService().getUserProfileService().getTenantInfo(builder.build(), new IResponseHandler<TenantInfo>() {
            @Override
            public void onSuccess(GenieResponse<TenantInfo> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<TenantInfo> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    /**
     * searchUser
     */
    private static void searchUser(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        UserSearchCriteria.SearchBuilder builder = gson.fromJson(requestJson,
                UserSearchCriteria.SearchBuilder.class);

        GenieService.getAsyncService().getUserProfileService().searchUser(builder.build(), new IResponseHandler<UserSearchResult>() {
            @Override
            public void onSuccess(GenieResponse<UserSearchResult> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<UserSearchResult> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    /**
     * getSkills
     */
    private static void getSkills(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        UserProfileSkillsRequest.Builder builder = gson.fromJson(requestJson,
                UserProfileSkillsRequest.Builder.class);

        GenieService.getAsyncService().getUserProfileService().getSkills(builder.build(), new IResponseHandler<UserProfileSkill>() {
            @Override
            public void onSuccess(GenieResponse<UserProfileSkill> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<UserProfileSkill> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }

    /**
     * endorseOrAddSkill
     */
    private static void endorseOrAddSkill(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        EndorseOrAddSkillRequest.Builder builder = gson.fromJson(requestJson,
                EndorseOrAddSkillRequest.Builder.class);

        GenieService.getAsyncService().getUserProfileService().endorseOrAddSkill(builder.build(), new IResponseHandler<Void>() {
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

    /**
     * setProfileVisibility
     */
    private static void setProfileVisibility(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        ProfileVisibilityRequest.Builder builder = gson.fromJson(requestJson,
                ProfileVisibilityRequest.Builder.class);

        GenieService.getAsyncService().getUserProfileService().setProfileVisibility(builder.build(), new IResponseHandler<Void>() {
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

    /**
     * uploadFile
     */
    private static void uploadFile(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        UploadFileRequest.Builder builder = gson.fromJson(requestJson,
                UploadFileRequest.Builder.class);

        GenieService.getAsyncService().getUserProfileService().uploadFile(builder.build(), new IResponseHandler<FileUploadResult>() {
            @Override
            public void onSuccess(GenieResponse<FileUploadResult> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse.getResult()));
            }

            @Override
            public void onError(GenieResponse<FileUploadResult> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse.getError()));
            }
        });
    }
}
