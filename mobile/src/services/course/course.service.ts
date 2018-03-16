import { Injectable } from "@angular/core";

import { EnrolledCoursesRequest, EnrollCourseRequest, UpdateContentStateRequest, CourseBatchesRequest } from "./bean"
import { ServiceProvider } from "../factory";
import { GenieResponse } from "../service.bean";

@Injectable()
export class CourseService {

    constructor(private factory: ServiceProvider) {

    }

    getEnrolledCourses(requestObject: EnrolledCoursesRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().getEnrolledCourses(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    enrollCourse(requestObject: EnrollCourseRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().enrollCourse(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    updateContentState(requestObject: UpdateContentStateRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().updateContentState(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getCourseBatches(requestObject: CourseBatchesRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().getCourseBatches(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

}