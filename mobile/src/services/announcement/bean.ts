export class AnnouncementDetailsRequest {
    announcementId: string;
}

export class AnnouncementListRequest {
    limit: number;
    offset: number;
}

export class UpdateAnnouncementStateRequest {
    announcementId: string;
    announcementStatus: AnnouncementStatus;
}

export enum AnnouncementStatus {
    RECEIVED = "received",
    READ = "read",
}