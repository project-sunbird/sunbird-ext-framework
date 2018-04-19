import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";

@Injectable()
export class SharedPreferences {

    constructor(private factory: ServiceProvider) {

    }

    getString(key: string, successCallback: (val: string) => void): void {
        this.factory.getSharedPreference().getString(key, successCallback);
    }

    putString(key: string, value: string): void {
        this.factory.getSharedPreference().putString(key, value);
    }

}