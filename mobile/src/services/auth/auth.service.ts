import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    createSession(callbackUrl: String,
        successCallback: (response: string) => void, 
        errorCallback: (error: string) => void) {
            (<any>window).GenieSDK.auth.createSession(callbackUrl,successCallback, errorCallback);
    }

    refreshSession(refreshToken: String,
        successCallback: (response: string) => void, 
        errorCallback: (error: string) => void) {
            (<any>window).GenieSDK.auth.refreshSession(refreshToken,successCallback, errorCallback);
    }
    
    getBearerToken(
        successCallback: (response: string) => void, 
        errorCallback: (error: string) => void) {
            (<any>window).GenieSDK.auth.getBearerToken(successCallback, errorCallback);
    }

    startSession(accessToken, refreshToken, userToken) {
        let sessionJson = {accessToken: accessToken, refreshToken: refreshToken, userToken: userToken};
        (<any>window).GenieSDK.auth.startSession(JSON.stringify(sessionJson));
    }

    endSession() {
        (<any>window).GenieSDK.auth.endSession();
    }

    getSessionData(successCallback) {
        (<any>window).GenieSDK.auth.getSessionData(successCallback);
    }

}