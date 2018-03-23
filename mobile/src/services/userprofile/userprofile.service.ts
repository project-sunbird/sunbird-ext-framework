import { Injectable } from "@angular/core";

import {
    UserProfileDetailsRequest, UserProfileSkillsRequest, TenantInfoRequest,
    UserSearchCriteria, EndorseOrAddSkillRequest, ProfileVisibilityRequest, UploadFileRequest
} from "./bean"

@Injectable()
export class UserProfileService {

    getUserProfileDetails(request: UserProfileDetailsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.getUserProfileDetails(JSON.stringify(request), onSuccess, onError);
    }

    getTenantInfo(request: TenantInfoRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.getTenantInfo(JSON.stringify(request), onSuccess, onError);
    }

    searchUser(request: UserSearchCriteria, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.searchUser(JSON.stringify(request), onSuccess, onError);
    }

    getSkills(request: UserProfileSkillsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.getSkills(JSON.stringify(request), onSuccess, onError);
    }

    endorseOrAddSkill(request: EndorseOrAddSkillRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.endorseOrAddSkill(JSON.stringify(request), onSuccess, onError);
    }

    setProfileVisibility(request: ProfileVisibilityRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.setProfileVisibility(JSON.stringify(request), onSuccess, onError);
    }

    uploadFile(request: UploadFileRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userprofile.uploadFile(JSON.stringify(request), onSuccess, onError);
    }

}