import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";


@Injectable()
export class LocationInfoService {

    constructor(private factory: ServiceProvider) {

    }

    getLocation(successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
          this.factory.getLocationService().getLocation(successCallback, errorCallback);
        } catch (error) {
          console.log(error);
        }
    }
}