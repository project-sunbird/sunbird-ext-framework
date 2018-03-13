import { Manifest, IMenu } from "web-framework/manager/PluginManager";

export const menu: IMenu = {
    id: 'home',
    name: 'home',
    displayName: "Home",
    type: "navigate",
    navigate: {
        URL: "home",
    }
}

export const manifest: Manifest = {
    id: "Menu",
    version: "1.0.0",
    menu: menu
}