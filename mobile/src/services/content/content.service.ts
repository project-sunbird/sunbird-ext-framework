import { Injectable } from "@angular/core";

import { ContentDetailRequest, ContentImportRequest, ContentSearchCriteria } from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class ContentService {


  constructor(private factory: ServiceProvider) {

  }

  getContentDetail(request: ContentDetailRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().getContentDetail(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  importContent(request: ContentImportRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().importContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  searchContent(request: ContentSearchCriteria,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().searchContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}
