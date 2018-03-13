import { MenuManager } from "web-framework/manager/MenuManager";
import { Manifest, IMenu } from "web-framework/manager/PluginManager";

export class ClientPlugin {
    private manifest: Manifest;

    constructor(manifest: Manifest) {
        this.manifest = manifest;
    }

    initialize() {
    }

    public getMenuObject(): any {
        return MenuManager.getMenu();
    }
}