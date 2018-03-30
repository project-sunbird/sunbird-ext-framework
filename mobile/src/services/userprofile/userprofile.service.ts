import { Injectable } from "@angular/core";

import {
    UserProfileDetailsRequest, UserProfileSkillsRequest, TenantInfoRequest,
    UserSearchCriteria, EndorseOrAddSkillRequest, ProfileVisibilityRequest, UploadFileRequest, UpdateUserInfoRequest
} from "./bean"

@Injectable()
export class UserProfileService {

    getUserProfileDetails(request: UserProfileDetailsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.getUserProfileDetails(JSON.stringify(request), onSuccess, onError);
    }

    getTenantInfo(request: TenantInfoRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.getTenantInfo(JSON.stringify(request), onSuccess, onError);
    }

    searchUser(request: UserSearchCriteria, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.searchUser(JSON.stringify(request), onSuccess, onError);
    }

    getSkills(request: UserProfileSkillsRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.getSkills(JSON.stringify(request), onSuccess, onError);
    }

    endorseOrAddSkill(request: EndorseOrAddSkillRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.endorseOrAddSkill(JSON.stringify(request), onSuccess, onError);
    }

    setProfileVisibility(request: ProfileVisibilityRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.setProfileVisibility(JSON.stringify(request), onSuccess, onError);
    }

    uploadFile(request: UploadFileRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.uploadFile(JSON.stringify(request), onSuccess, onError);
    }

    updateUserInfo(request: UpdateUserInfoRequest, onSuccess, onError) {
        (<any>window).GenieSDK.userProfile.updateUserInfo(JSON.stringify(request), onSuccess, onError);
    }

}