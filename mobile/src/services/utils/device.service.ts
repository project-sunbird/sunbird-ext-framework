import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";


@Injectable()
export class DeviceInfoService {

    constructor(private factory: ServiceProvider) {

    }

    getDeviceID(successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
          this.factory.getDeviceService().getDeviceID(successCallback, errorCallback);
        } catch (error) {
          console.log(error);
        }
    }
}