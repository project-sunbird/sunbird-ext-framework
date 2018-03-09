import { IFrameworkConfig, Framework } from '../index'
import { Manifest, PluginManager } from "../manager/PluginManager";

export class TestFramework {
    public static initialize(config: IFrameworkConfig) {
        Framework.initialize([config]).then(() => {

        })
    }
    public static getPluginInstance(id: Manifest['id']) {
        return PluginManager.getPluginInstance(id);
    }
}
