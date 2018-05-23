/**
 * @author Sunil A S <sunils@ilimi.in>
 */

import { Manifest } from './Manifest';
/**
 * 
 * 
 * @export
 * @interface IPluginLifeCycleEvents
 */
export interface IPluginLifeCycleEvents {
    onLoad?();
    onUnload?();
    onStart?();
    onStop?();
};
