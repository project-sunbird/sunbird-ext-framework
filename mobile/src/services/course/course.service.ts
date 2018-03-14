import { Injectable } from "@angular/core";

import { EnrolledCoursesRequest, EnrollCourseRequest, UpdateContentStateRequest, CourseBatchesRequest } from "./bean"

@Injectable()
export class CourseService {

    getEnrolledCourses(request: { EnrolledCoursesRequest },
        successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
            (<any>window).GenieSDK.course.getEnrolledCourses(
                JSON.stringify(request),
                successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    enrollCourse(request: { EnrollCourseRequest },
        successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
            (<any>window).GenieSDK.course.enrollCourse(
                JSON.stringify(request),
                successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    updateContentState(request: { UpdateContentStateRequest },
        successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
            (<any>window).GenieSDK.course.updateContentState(
                JSON.stringify(request),
                successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getCourseBatches(request: { CourseBatchesRequest },
        successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
            (<any>window).GenieSDK.course.getCourseBatches(
                JSON.stringify(request),
                successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

}