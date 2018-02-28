/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eb } from '../lib/EventBus';
export class EventManager {
    private enableEvents: boolean = true;
    addEventListener(type: string, callback: any, scope: any) {
        eb.addEventListener(type, callback, scope)
    }
    dispatchEvent(type: string, data?: any, target?: any) {
        eb.dispatch(type, target);
    }
    removeEventListener(type: string, callBack: any, scope: any) {
        eb.removeEventListener(type, callBack, scope);
    }
}

export const eventManager = new EventManager();