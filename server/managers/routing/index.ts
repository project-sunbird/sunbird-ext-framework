import {Router, Express} from 'express';

export interface IRouterConfig {
    prefix?: string;
    basePath: string;
    id: string; // plugin Id
}

export class RouterRegistry {
    private static rootApp: Express;
    private config: IRouterConfig;
    private router: Router;
    private static routerInstances: Array<{[key:string]: Router}>;

    static initialize(app: Express) {
        RouterRegistry.rootApp = app;
    }

    public static create(config: IRouterConfig): RouterRegistry {
        const instance = new RouterRegistry();
        instance.config = config;
        instance.router = Router();
        return instance;
    }

    public register(route: Router) {
        //default
        RouterRegistry.routerInstances.push({ [this.config.id]: route})
        //TODO: foreach route object register it in cassandra
        RouterRegistry.rootApp.use(this.config.prefix || '' + this.config.basePath, route);
    }
}