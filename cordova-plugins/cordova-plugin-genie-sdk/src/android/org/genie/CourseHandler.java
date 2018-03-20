package org.genie;

import org.apache.cordova.CallbackContext;
import org.ekstep.genieservices.GenieService;
import org.ekstep.genieservices.commons.IResponseHandler;
import org.ekstep.genieservices.commons.bean.CourseBatchesRequest;
import org.ekstep.genieservices.commons.bean.CourseBatchesResponse;
import org.ekstep.genieservices.commons.bean.EnrollCourseRequest;
import org.ekstep.genieservices.commons.bean.EnrolledCoursesRequest;
import org.ekstep.genieservices.commons.bean.EnrolledCoursesResponse;
import org.ekstep.genieservices.commons.bean.GenieResponse;
import org.ekstep.genieservices.commons.bean.UpdateContentStateRequest;
import org.ekstep.genieservices.commons.utils.GsonUtil;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created on 14/3/18.
 * shriharsh
 */

public class CourseHandler {

    private static final String TYPE_GET_ENROLLED_COURSES = "getEnrolledCourses";
    private static final String TYPE_ENROLL_COURSE = "enrollCourse";
    private static final String TYPE_UPDATE_CONTENT_STATE = "updateContentState";
    private static final String TYPE_GET_COURSE_BATCHES = "getCourseBatches";

    public static void handle(JSONArray args, final CallbackContext callbackContext) {
        try {
            String type = args.getString(0);
            if (type.equals(TYPE_GET_ENROLLED_COURSES)) {
                getEnrolledCourses(args, callbackContext);
            } else if (type.equals(TYPE_ENROLL_COURSE)) {
                enrollCourse(args, callbackContext);
            } else if (type.equals(TYPE_UPDATE_CONTENT_STATE)) {
                updateContentState(args, callbackContext);
            } else if (type.equals(TYPE_GET_COURSE_BATCHES)) {
                getCourseBatches(args, callbackContext);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static void getEnrolledCourses(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);

        EnrolledCoursesRequest.Builder builder = GsonUtil.fromJson(requestJson,
                EnrolledCoursesRequest.Builder.class);

        GenieService.getAsyncService().getCourseService().getEnrolledCourses(builder.build(),
                new IResponseHandler<EnrolledCoursesResponse>() {
                    @Override
                    public void onSuccess(GenieResponse<EnrolledCoursesResponse> genieResponse) {
                        callbackContext.success(GsonUtil.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<EnrolledCoursesResponse> genieResponse) {
                        callbackContext.error(GsonUtil.toJson(genieResponse));
                    }
                });
    }

    private static void enrollCourse(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);

        EnrollCourseRequest.Builder builder = GsonUtil.fromJson(requestJson,
                EnrollCourseRequest.Builder.class);
        
        GenieService.getAsyncService().getCourseService().enrollCourse(builder.build(), new IResponseHandler<Void>() {
            @Override
            public void onSuccess(GenieResponse<Void> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse));
            }

            @Override
            public void onError(GenieResponse<Void> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse));
            }
        });
    }

    private static void updateContentState(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);

        UpdateContentStateRequest.Builder builder = GsonUtil.fromJson(requestJson,
                UpdateContentStateRequest.Builder.class);
        
        GenieService.getAsyncService().getCourseService().updateContentState(builder.build(), new IResponseHandler<Void>() {
            @Override
            public void onSuccess(GenieResponse<Void> genieResponse) {
                callbackContext.success(GsonUtil.toJson(genieResponse));
            }

            @Override
            public void onError(GenieResponse<Void> genieResponse) {
                callbackContext.error(GsonUtil.toJson(genieResponse));
            }
        });
    }

    private static void getCourseBatches(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String requestJson = args.getString(1);

        CourseBatchesRequest.Builder builder = GsonUtil.fromJson(requestJson,
                CourseBatchesRequest.Builder.class);
        
        GenieService.getAsyncService().getCourseService().getCourseBatches(builder.build(),
                new IResponseHandler<CourseBatchesResponse>() {
                    @Override
                    public void onSuccess(GenieResponse<CourseBatchesResponse> genieResponse) {
                        callbackContext.success(GsonUtil.toJson(genieResponse));
                    }

                    @Override
                    public void onError(GenieResponse<CourseBatchesResponse> genieResponse) {
                        callbackContext.error(GsonUtil.toJson(genieResponse));
                    }
                });
    }
}