import { Injectable } from "@angular/core";


@Injectable()
export class QRScanner {

    startScanner(screenTitle: String, displayText: String, displayTextColor: String, successCallback: (data: String) => void, errorCallback: () => void) {
        (<any>window).qrScanner.startScanner(screenTitle, displayText, displayTextColor, successCallback, errorCallback);
    }

    stopScanner(successCallback: () => void, errorCallback: () => void) {
        (<any>window).qrScanner.stopScanner(successCallback, errorCallback);
    }
}