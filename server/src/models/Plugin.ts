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
}
/**
 * 
 * 
 * @export
 * @class ExtPlugin
 * @implements {IPluginLifeCycleEvents}
 */
export class ExtPlugin implements IPluginLifeCycleEvents {

    private readonly manifest: Manifest;
    /**
     * Creates an instance of ExtPlugin.
     * @param {Manifest} manifest 
     * @memberof ExtPlugin
     */
    constructor(manifest: Manifest) {
        this.manifest = manifest;
    }

    onLoad() { }
}