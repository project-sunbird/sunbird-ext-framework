import { PluginManager } from "./manager/PluginManager";

export class FrameworkAPI {
    public static getPluginInstance(plugnId: string): object {
        return PluginManager.getPluginInstance(plugnId);
    }
}
export const frameworkAPI = new FrameworkAPI();