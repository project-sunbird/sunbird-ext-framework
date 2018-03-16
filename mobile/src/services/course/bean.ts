export declare class EnrolledCoursesRequest {
    userId: String;
    refreshEnrolledCourses: Boolean;
}

export declare class EnrollCourseRequest {
    userId: String;
    courseId: String;
    contentId: String;
    batchId: String;
}

export declare class UpdateContentStateRequest {
    userId: String;
    courseId: String;
    contentId: String;
    batchId: String;
    status: Number;
    progress: Number;
    result: String;
    grade: String;
    score: String;
}

export declare class CourseBatchesRequest {
    courseId: String[];
}