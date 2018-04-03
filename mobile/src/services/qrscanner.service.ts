import { Injectable } from "@angular/core";


@Injectable()
export class QRScanner {

    startScanner(successCallback: (data: String) => void, errorCallback: () => void) {
        (<any>window).qrScanner.startScanner(successCallback, errorCallback);
    }

    stopScanner(successCallback: () => void, errorCallback: () => void) {
        (<any>window).qrScanner.stopScanner(successCallback, errorCallback);
    }
}