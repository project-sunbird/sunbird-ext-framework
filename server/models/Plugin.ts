/**
 * @author Sunil A S <sunils@ilimi.in>
 */

import {Manifest} from './Manifest';

export interface IPluginLifeCycleEvents {
    onLoad?();
    onUnload?();
    onStart?();
    onStop?();
}
export class ExtPlugin implements IPluginLifeCycleEvents{

    private readonly manifest: Manifest;

    constructor(manifest: Manifest) {
        this.manifest = manifest;
    }

    onLoad() {}
}