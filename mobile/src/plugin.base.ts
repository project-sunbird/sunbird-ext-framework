import { ContainerService } from "./container/container.services";


export interface BasePlugin {
    init(container: ContainerService);
}