import * as mitt from 'mitt';


export class EventManager {

  static emitter: mitt.Emitter = new mitt();

  public static emit(name: string, data: any) {
    this.emitter.emit(name, data);
  }

  public static subscribe(name: string, method: any) {
    this.emitter.on(name, method);
  }

  public static unsubscribe(name: string, method: any) {
    this.emitter.off(name, method);
  }

}