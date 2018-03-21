package org.genie;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import org.apache.cordova.CallbackContext;
import org.ekstep.genieservices.GenieService;
import org.ekstep.genieservices.commons.IResponseHandler;
import org.ekstep.genieservices.commons.bean.ChildContentRequest;
import org.ekstep.genieservices.commons.bean.Content;
import org.ekstep.genieservices.commons.bean.ContentDetailsRequest;
import org.ekstep.genieservices.commons.bean.ContentFilterCriteria;
import org.ekstep.genieservices.commons.bean.ContentImport;
import org.ekstep.genieservices.commons.bean.ContentImportRequest;
import org.ekstep.genieservices.commons.bean.ContentImportResponse;
import org.ekstep.genieservices.commons.bean.ContentSearchCriteria;
import org.ekstep.genieservices.commons.bean.ContentSearchResult;
import org.ekstep.genieservices.commons.bean.EcarImportRequest;
import org.ekstep.genieservices.commons.bean.GenieResponse;
import org.ekstep.genieservices.commons.utils.GsonUtil;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * Created by souvikmondal on 9/2/18.
 */

public class ContentHandler {

    private static final String TYPE_GET_CONTENT_DETAIL = "getContentDetail";
    private static final String TYPE_IMPORT_ECAR = "importEcar";
    private static final String TYPE_IMPORT_CONTENT = "importContent";

    public static void handle(JSONArray args, final CallbackContext callbackContext) {
        try {
            String type = args.getString(0);
            if (type.equals(TYPE_GET_CONTENT_DETAIL)) {
                getContentDetail(args, callbackContext);
            } else if (type.equals(TYPE_IMPORT_ECAR)) {
                importEcar(args, callbackContext);
            } else if (type.equals(TYPE_IMPORT_CONTENT)) {
                importContent(args, callbackContext);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static void getContentDetail(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();
        ContentDetailsRequest request = gson.fromJson(requestJson, ContentDetailsRequest.class);
        GenieService.getAsyncService().getContentService().getContentDetails(request, new IResponseHandler<Content>() {
            @Override
            public void onSuccess(GenieResponse<Content> genieResponse) {
                callbackContext.success(gson.toJson(genieResponse));
            }

            @Override
            public void onError(GenieResponse<Content> genieResponse) {
                callbackContext.error(gson.toJson(genieResponse));

            }
        });
    }

    private static void importEcar(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        EcarImportRequest.Builder builder = gson.fromJson(requestJson, EcarImportRequest.Builder.class);

        GenieService.getAsyncService().getContentService().importEcar(builder.build(),
                new IResponseHandler<List<ContentImportResponse>>() {
                    @Override
                    public void onSuccess(GenieResponse<List<ContentImportResponse>> genieResponse) {
                        callbackContext.success(gson.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<List<ContentImportResponse>> genieResponse) {
                        callbackContext.error(gson.toJson(genieResponse));
                    }
                });
    }

    private static void importContent(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);
        final Gson gson = new GsonBuilder().create();

        JSONObject contentImportRequestBuilder = new JSONObject(requestJson);
        Type contentImportMapType = new TypeToken<Map<String, ContentImport>>() {
        }.getType();

        Map<String, ContentImport> contentImportMap = gson
                .fromJson(contentImportRequestBuilder.optString("contentImportMap"), contentImportMapType);

        ContentImportRequest.Builder builder = new ContentImportRequest.Builder();

        for (String key : contentImportMap.keySet()) {
            builder.add(contentImportMap.get(key));
        }

        GenieService.getAsyncService().getContentService().importContent(builder.build(),
                new IResponseHandler<List<ContentImportResponse>>() {
                    @Override
                    public void onSuccess(GenieResponse<List<ContentImportResponse>> genieResponse) {
                        callbackContext.success(gson.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<List<ContentImportResponse>> genieResponse) {
                        callbackContext.error(gson.toJson(genieResponse));
                    }
                });
    }

    private static void searchContent(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);

        ContentSearchCriteria.SearchBuilder builder = GsonUtil.fromJson(requestJson,
                ContentSearchCriteria.SearchBuilder.class);

        GenieService.getAsyncService().getContentService().searchContent(builder.build(),
                new IResponseHandler<ContentSearchResult>() {
                    @Override
                    public void onSuccess(GenieResponse<ContentSearchResult> genieResponse) {
                        callbackContext.success(GsonUtil.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<ContentSearchResult> genieResponse) {
                        callbackContext.error(GsonUtil.toJson(genieResponse));
                    }
                });
    }

    private static void getAllLocalContents(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);

        ContentFilterCriteria.Builder builder = GsonUtil.fromJson(requestJson,
                ContentFilterCriteria.Builder.class);

        GenieService.getAsyncService().getContentService().getAllLocalContent(builder.build(),
                new IResponseHandler<List<Content>>() {
                    @Override
                    public void onSuccess(GenieResponse<List<Content>> genieResponse) {
                        callbackContext.success(GsonUtil.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<List<Content>> genieResponse) {
                        callbackContext.error(GsonUtil.toJson(genieResponse));
                    }
                });
    }

    private static void getChildContents(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final String requestJson = args.getString(1);

        ChildContentRequest.Builder builder =  GsonUtil.fromJson(requestJson,
                ChildContentRequest.Builder.class);

        GenieService.getAsyncService().getContentService().getChildContents(builder.build(),
                new IResponseHandler<Content>() {
                    @Override
                    public void onSuccess(GenieResponse<Content> genieResponse) {
                        callbackContext.success(GsonUtil.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<Content> genieResponse) {
                        callbackContext.error(GsonUtil.toJson(genieResponse));
                    }
                });
    }

}
