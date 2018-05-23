/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Router, Express } from 'express';
import { IRouteSchema, Manifest } from '../models/Manifest';
import * as _ from 'lodash';
import { FrameworkConfig } from '..';
import { FrameworkError, FrameworkErrors, Util } from '../util';
import * as cls from 'continuation-local-storage';

export class RouterRegistry {
    private static rootApp: Express;
    private static routerInstances: Array<{ [key: string]: Router }> = [];
    private static threadLocalNamespace: any;

    public static initialize(app: Express) {
        RouterRegistry.rootApp = app;
        RouterRegistry.threadLocalNamespace = cls.createNamespace('com.sunbird');
    }
    /**
     *
     *
     * @static
     * @param {Manifest} manifest
     * @returns {Router}
     * @memberof RouterRegistry
     */
    public static bindRouter(manifest: Manifest): Router {
        const router = Router();
        const prefix = _.get(manifest, 'server.routes.prefix');
        if (!prefix) throw new FrameworkError({ message: `cannot bind "Router" object to App`, code: FrameworkErrors.ROUTE_REGISTRY_FAILED });
        router.use(RouterRegistry.threadLocal(RouterRegistry.getThreadNamespace()));
        RouterRegistry.routerInstances.push({ [manifest.id]: router });
        RouterRegistry.rootApp.use(prefix, router);
        return router;
    }

    public static getThreadNamespace() {
        return RouterRegistry.threadLocalNamespace;
    }

    private static threadLocal(namespace: any) {
        return function (req, res, next) {
            namespace.bindEmitter(req);
            namespace.bindEmitter(res);
            namespace.run(() => {
                namespace.set('requestId', Util.UUID());
                next();
            });
        };
    }
}