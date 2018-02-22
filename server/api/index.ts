/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { PluginManager } from "../managers/PluginManager";

export class FrameworkAPI {
    constructor(config: object) {

    }

    public getPlugin(pluginId: string): any {
        return PluginManager.getPlugin(pluginId);
    }
}

export const api = FrameworkAPI;