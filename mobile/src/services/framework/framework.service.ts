import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { FrameworkDetailsRequest, CategoryRequest } from "./bean";

@Injectable()
export class FrameworkService {

  constructor(private factory: ServiceProvider) {

  }

  getFrameworkDetails(request: FrameworkDetailsRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getFrameworkService().getFrameworkDetails(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getCategoryData(request: CategoryRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getFrameworkService().getCategoryData(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }
}