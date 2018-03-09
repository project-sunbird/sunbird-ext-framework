/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { PluginManager } from "../managers/PluginManager";
import { FrameworkConfig } from "../interfaces";

export class FrameworkAPI {
    constructor(config: FrameworkConfig) {

    }

    public getPlugin(pluginId: string): any {
        return PluginManager.getPluginInstance(pluginId);
    }
}

export const api = FrameworkAPI;