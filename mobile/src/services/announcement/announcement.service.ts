import { Injectable } from "@angular/core";

import {
    AnnouncementRequest, UserInboxRequest,
    ReceivedAnnouncementRequest
} from "./bean";

@Injectable()
export class AnnouncementService {
    getAnnouncementById(request: AnnouncementRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            getAnnouncementById(JSON.stringify(request), onSuccess, onError);
    }

    userInbox(request: UserInboxRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            userInbox(JSON.stringify(request), onSuccess, onError);
    }

    receivedAnnouncement(request: ReceivedAnnouncementRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            receivedAnnouncement(JSON.stringify(request), onSuccess, onError);
    }

    readAnnouncement(request: ReceivedAnnouncementRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            readAnnouncement(JSON.stringify(request), onSuccess, onError);
    }
}