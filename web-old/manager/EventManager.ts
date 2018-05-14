/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventBus } from '../lib/EventBus';
export class EventManager {
    static addEventListener(type: string, callback: any, scope?: any) {
        eventBus.addEventListener(type, callback, scope)
    }
    static dispatchEvent(type: string, data?: any, target?: any) {
        eventBus.dispatch(type, target);
    }
    static removeEventListener(type: string, callBack: any, scope?: any) {
        eventBus.removeEventListener(type, callBack, scope);
    }
}