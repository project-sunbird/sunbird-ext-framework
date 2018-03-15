import { Injectable } from "@angular/core";
import { ServiceProvider } from "./factory";

@Injectable()
export class GenieSDKServiceProvider extends ServiceProvider {

    getTelemteryService(): any {
        return (<any>window).GenieSDK.telemetry;
    }

    getCourseService(): any {
        return (<any>window).GenieSDK.course;
    }

}