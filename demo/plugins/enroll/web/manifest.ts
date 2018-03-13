import { Manifest, IMenu } from "web-framework/manager/PluginManager";

export const menu: IMenu = {
    id: 'enroll',
    name: 'enroll',
    displayName: "Enroll",
    type: "navigate",
    navigate: {
        URL: "enroll",
    },
}
export const manifest: Manifest = {
    id: "enroll",
    version: "1.0.0",
    menu: menu
}
