/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventBus } from '../lib/EventBus';
export class EventManager {
    private enableEvents: boolean = true;
    addEventListener(type: string, callback: any, scope?: any) {
        eventBus.addEventListener(type, callback, scope)
    }
    dispatchEvent(type: string, data?: any, target?: any) {
        eventBus.dispatch(type, target);
    }
    removeEventListener(type: string, callBack: any, scope?: any) {
        eventBus.removeEventListener(type, callBack, scope);
    }
}

export const eventManager = new EventManager();