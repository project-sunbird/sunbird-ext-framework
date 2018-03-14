export interface EnrolledCoursesRequest {
    userId: String;
    refreshEnrolledCourses: Boolean;
}

export interface EnrollCourseRequest {
    userId: String;
    courseId: String;
    contentId: String;
    batchId: String;
}

export interface UpdateContentStateRequest {
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

export interface CourseBatchesRequest {
    courseId: String[];
}