import { Injectable } from "@angular/core";

import {UserProfileDetailsRequest, UserProfileSkillsRequest} from "./bean"

@Injectable()
export class UserProfileService {

    getUserProfileDetails(request: UserProfileDetailsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.getUserProfileDetails(JSON.stringify(request), onSuccess, onError);
    }

    getSkills(request: UserProfileSkillsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.getSkills(JSON.stringify(request), onSuccess, onError);
    }
}