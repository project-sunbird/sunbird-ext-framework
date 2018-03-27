export class EnrolledCoursesRequest {
    userId: String;
    refreshEnrolledCourses?: Boolean;
}

export class EnrollCourseRequest {
    userId: String;
    courseId: String;
    contentId: String;
    batchId: String;
}

export class UpdateContentStateRequest {
    userId: String;
    courseId: String;
    contentId: String;
    batchId: String;
    status?: Number;
    progress?: Number;
    result?: String;
    grade?: String;
    score?: String;
}

export class CourseBatchesRequest {
    courseIds: String[];
}