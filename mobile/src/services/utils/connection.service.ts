import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";


@Injectable()
export class ConnectionInfoService {

    constructor(private factory: ServiceProvider) {

    }

    isConnected(successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
          this.factory.getConnectionService().isConnected(successCallback, errorCallback);
        } catch (error) {
          console.log(error);
        }
    }

    isConnectedOverWifi(successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
          this.factory.getConnectionService().isConnectedOverWifi(successCallback, errorCallback);
        } catch (error) {
          console.log(error);
        }
    }
}