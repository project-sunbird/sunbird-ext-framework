import { Injectable } from "@angular/core";

import {
    AnnouncementDetailsRequest, AnnouncementListRequest,
    UpdateAnnouncementStateRequest
} from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class AnnouncementService {

    constructor(private factory: ServiceProvider) {

    }

    getAnnouncementDetails(request: AnnouncementDetailsRequest, onSuccess, onError) {
        this.factory.getAnnouncementService().getAnnouncementDetails(JSON.stringify(request), onSuccess, onError);
    }

    getAnnouncementList(request: AnnouncementListRequest, onSuccess, onError) {
        this.factory.getAnnouncementService().getAnnouncementList(JSON.stringify(request), onSuccess, onError);
    }

    updateAnnouncementState(request: UpdateAnnouncementStateRequest, onSuccess, onError) {
        this.factory.getAnnouncementService().updateAnnouncementState(JSON.stringify(request), onSuccess, onError);
    }
}