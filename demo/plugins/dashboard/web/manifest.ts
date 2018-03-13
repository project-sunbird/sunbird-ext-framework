import { Manifest, IMenu } from "web-framework/manager/PluginManager";

export const menu: IMenu = {
    id: 'dashboard',
    name: 'dashboard',
    displayName: "Dashboard",
    type: "navigate",
    navigate: {
        URL: "dashboard",
    },
}
export const manifest: Manifest = {
    id: "dashboard",
    version: "1.0.0",
    menu: menu
}
