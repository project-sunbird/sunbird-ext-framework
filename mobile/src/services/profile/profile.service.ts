import { Injectable } from "@angular/core";

@Injectable()
export class ProfileService {

    getProfileById(request: {userId: string, 
        requiredFields: Array<string>, 
        refreshUserProfileDetails: boolean}, onSuccess, onError) {

            let requestJson = JSON.stringify(request);
            (<any>window).GenieSDK.profile.getProfileById(requestJson, onSuccess, onError);
    }

}