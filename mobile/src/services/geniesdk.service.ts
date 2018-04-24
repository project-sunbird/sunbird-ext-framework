import { Injectable } from "@angular/core";
import { ServiceProvider } from "./factory";

@Injectable()
export class GenieSDKServiceProvider extends ServiceProvider {

    getTelemteryService(): any {
        return (<any>window).GenieSDK.telemetry;
    }

    getProfileService(): any {
        return (<any>window).GenieSDK.profile;
    }

    getCourseService(): any {
        return (<any>window).GenieSDK.course;
    }

    getContentService(): any {
        return (<any>window).GenieSDK.content;
    }

    getPageAssembleService(): any {
        return (<any>window).GenieSDK.pageAssemble;
    }

    getAnnouncementService(): any {
        return (<any>window).GenieSDK.announcement;
    }

    getFrameworkService(): any {
        return (<any>window).GenieSDK.framework;
    }

    getSharedPreference(): any {
        return (<any>window).GenieSDK.preferences;
    }

    getConnectionService(): any {
        return (<any>window).GenieSDK.genieSdkUtil;
    }

    getDeviceService(): any {
        return (<any>window).GenieSDK.genieSdkUtil;
    }

    getLocationService(): any {
        return (<any>window).GenieSDK.genieSdkUtil;
    }

    getShareService(): any {
        return (<any>window).GenieSDK.share;
    }

}