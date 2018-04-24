import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";

@Injectable()
export class ShareUtil {

    constructor(private factory: ServiceProvider) {

    }

    exportEcar(contentId: string, onSuccess: (path: string) => void, onError: (path: string) => void) {
        this.factory.getShareService().exportEcar(contentId, onSuccess, onError);
    }

}