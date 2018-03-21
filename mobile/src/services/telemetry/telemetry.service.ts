import { Injectable } from "@angular/core";
import { Impression, Start, Audit, End, ExData, Feedback, Interact, Interrupt, Log, Search, Share, SyncStat } from './bean';
import { ServiceProvider } from "../factory";
import { GenieResponse } from "../service.bean";

@Injectable()
export class TelemetryService {

  constructor(private factory: ServiceProvider) {

  }

  audit(audit: Audit) {
    try { 
      this.factory.getTelemteryService().audit(JSON.stringify(audit));
    } catch (error) {
      console.log(error);
    }
  }

  start(start: Start) {
    try {
      this.factory.getTelemteryService().start(JSON.stringify(start));
    } catch (error) {
      console.log(error);
    }
  }

  end(end: End) {
    try {
      this.factory.getTelemteryService().end(JSON.stringify(end));
    } catch (error) {
      console.log(error);
    }
  }

  error(error: Error) {
    try {
      this.factory.getTelemteryService().error(JSON.stringify(error));
    } catch (error) {
      console.log(error);
    }
  }

  exdata(exdata: ExData) {
    try {
      this.factory.getTelemteryService().exdata(JSON.stringify(exdata));
    } catch (error) {
      console.log(error);
    }
  }


  feedback(feedback: Feedback) {
    try {
      this.factory.getTelemteryService().feedback(JSON.stringify(feedback));
    } catch (error) {
      console.log(error);
    }
  }

  impression(impression: Impression) {
    try {
      this.factory.getTelemteryService().impression(JSON.stringify(impression));
    } catch (error) {
      console.log(error);
    }
  }


  interact(interact: Interact) {
    try {
      this.factory.getTelemteryService().interact(JSON.stringify(interact));
    } catch (error) {
      console.log(error);
    }
  }


  interrupt(interrupt: Interrupt) {
    try {
      this.factory.getTelemteryService().interrupt(JSON.stringify(interrupt));
    } catch (error) {
      console.log(error);
    }
  }


  log(log: Log) {
    try {
      this.factory.getTelemteryService().log(JSON.stringify(log));
    } catch (error) {
      console.log(error);
    }
  }

  search(search: Search) {
    try {
      this.factory.getTelemteryService().search(JSON.stringify(search));
    } catch (error) {
      console.log(error);
    }
  }

  share(share: Share) {
    try {
      this.factory.getTelemteryService().share(JSON.stringify(share));
    } catch (error) {
      console.log(error);
    }
  }

  sync(successCallback: (response: GenieResponse<SyncStat>) => void,
    errorCallback: (error: GenieResponse<SyncStat>) => void) {
    try {
      this.factory.getTelemteryService().sync(successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}
