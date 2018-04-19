import { Injectable } from "@angular/core";

declare var cordova;

@Injectable()
export class FileUtil {

    internalStoragePath(): string {
        let path: string = cordova.file.externalDataDirectory;
        return path.substr(7); 
    }

}