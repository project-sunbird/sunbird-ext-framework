/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Router, Express } from 'express';
import { IRouteSchema, Manifest } from '../models/Manifest';

export class RouterRegistry {
    private static rootApp: Express;
    private manifest: Manifest;
    private router: Router;
    private static routerInstances: Array<{ [key: string]: Router }> = [];

    static initialize(app: Express) {
        RouterRegistry.rootApp = app;
    }
    /**
     * 
     * 
     * @static
     * @param {Manifest} manifest 
     * @returns {Router} 
     * @memberof RouterRegistry
     */
    public static getRouter(manifest: Manifest): Router {
        let router = Router();
        RouterRegistry.routerInstances.push({ [manifest.id]: router })
        RouterRegistry.rootApp.use(manifest.server.routes.prefix, router);
        return router;
    }
}