/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Router, Express, Response, Request, NextFunction, RequestHandler } from 'express';
import { IRouteSchema, Manifest } from '../models/Manifest';
import * as _ from 'lodash';
import { FrameworkConfig } from '../interfaces';
import { FrameworkError, FrameworkErrors, Util } from '../util';
import * as cls from 'continuation-local-storage';
import { Singleton } from 'typescript-ioc';

@Singleton
export class RouterRegistry {
    private rootApp: Express;
    private routerInstances: Array<{ [key: string]: Router }> = [];
    private threadLocalNamespace: any;

    public initialize(app: Express) {
        this.rootApp = app;
        this.threadLocalNamespace = cls.createNamespace('com.sunbird');
    }
    /**
     *
     *
     * @static
     * @param {Manifest} manifest
     * @returns {Router}
     * @memberof RouterRegistry
     */
    public bindRouter(manifest: Manifest): Router {
        const router = Router();
        const prefix = _.get(manifest, 'server.routes.prefix');
        if (!prefix) throw new FrameworkError({ message: `cannot bind "Router" object to App`, code: FrameworkErrors.ROUTE_REGISTRY_FAILED });
        router.use(this.threadLocal(this.getThreadNamespace()));
        this.routerInstances.push({ [manifest.id]: router });
        this.rootApp.use(prefix, router);
        return router;
    }

    public getThreadNamespace() {
        return this.threadLocalNamespace;
    }

    public threadLocal(namespace: any): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            namespace.bindEmitter(req);
            namespace.bindEmitter(res);
            namespace.run(() => {
                namespace.set('requestId', Util.UUID());
                namespace.set('headers', _.clone(req.headers));
                next();
            });
        };
    }
}