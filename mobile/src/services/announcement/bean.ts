export declare class AnnouncementDetailsRequest {
    announcementId: string;
}

export declare class AnnouncementListRequest {
    limit: number;
    offset: number;
}

export declare class UpdateAnnouncementStateRequest {
    announcementId: string;
    announcementStatus: AnnouncementStatus;
}

export enum AnnouncementStatus {
    RECEIVED = "received",
    READ = "read",
}