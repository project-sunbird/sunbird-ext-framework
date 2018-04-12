import { Injectable } from "@angular/core";
import { Profile } from "./bean"

@Injectable()
export class ProfileService {

    createProfile(request: Profile, onSuccess, onError) {
        (<any>window).GenieSDK.profile.createProfile(JSON.stringify(request), onSuccess, onError);
    }

    setCurrentUser(request: string, onSuccess, onError) {
        (<any>window).GenieSDK.profile.setCurrentUser(request, onSuccess, onError);
    }
    
}