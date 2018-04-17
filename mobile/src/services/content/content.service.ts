import { Injectable } from "@angular/core";

import {
  ContentDetailRequest, ContentImportRequest, ContentSearchCriteria, ContentFilterCriteria, ChildContentRequest, ContentDeleteRequest,
  ContentExportRequest, DownloadAction
} from "./bean";
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
    isFilterApplied: boolean,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().searchContent(JSON.stringify(request), isFilterApplied, successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

   getAllLocalContents(request: ContentFilterCriteria,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getAllLocalContents(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getChildContents(request: ChildContentRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getChildContents(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  deleteContent(request: ContentDeleteRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().deleteContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getImportStatus(request: Array<String>,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getImportStatus(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  cancelDownload(request: String,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().cancelDownload(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  exportContent(request: ContentExportRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().exportContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  setDownloadAction(request: DownloadAction,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().setDownloadAction(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getDownloadState(successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getDownloadState(successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}
