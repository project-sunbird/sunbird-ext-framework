import { Injectable } from "@angular/core";

import {
    AnnouncementDetailsRequest, AnnouncementListRequest,
    UpdateAnnouncementStateRequest
} from "./bean";

@Injectable()
export class AnnouncementService {
    getAnnouncementDetails(request: AnnouncementDetailsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            getAnnouncementDetails(JSON.stringify(request), onSuccess, onError);
    }

    getAnnouncementList(request: AnnouncementListRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            getAnnouncementList(JSON.stringify(request), onSuccess, onError);
    }

    updateAnnouncementState(request: UpdateAnnouncementStateRequest, onSuccess, onError) {
        (<any>window).GenieSDK.announcement.
            updateAnnouncementState(JSON.stringify(request), onSuccess, onError);
    }
}