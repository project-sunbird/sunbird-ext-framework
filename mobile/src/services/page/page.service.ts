import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { PageAssembleCriteria } from "./bean";

@Injectable()
export class PageAssembleService {

  constructor(private factory: ServiceProvider) {

  }

  getPageAssemble(criteria: PageAssembleCriteria, 
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try { 
      this.factory.getPageAssembleService().getPageAssemble(
        JSON.stringify(criteria), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }


}
