/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import * as express from 'express';
import { IRouteSchema, Manifest } from '../models/Manifest';
import * as _ from 'lodash';
import { FrameworkConfig } from '../interfaces';
import { FrameworkError, FrameworkErrors, Util } from '../util';
import * as cls from 'continuation-local-storage';
import { Singleton } from 'typescript-ioc';

@Singleton
export class RouterRegistry {
    private rootApp: express.Express;
    private routerInstances: Array<{ [key: string]: express.Router }> = [];
    private threadLocalNamespace: any;

    public initialize(app: express.Express) {
        this.rootApp = app;
        this.threadLocalNamespace = cls.createNamespace('com.sunbird');
    }
    /**
     *
     *
     * @param {Manifest} manifest
     * @returns {Router}
     * @memberof RouterRegistry
     */
    public bindRouter(manifest: Manifest): express.Router {
        const router = express.Router();
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

    public threadLocal(namespace: any): express.RequestHandler {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            namespace.bindEmitter(req);
            namespace.bindEmitter(res);
            namespace.run(() => {
                namespace.set('requestId', Util.UUID());
                namespace.set('headers', _.clone(req.headers));
                next();
            });
        };
    }
    public registerStaticRoute(path: string, prefix?: string) {
        if (prefix) {
            this.rootApp.use(prefix, express.static(path));
        }
        this.rootApp.use(express.static(path));
    }

    public setStaticViewEngine(name: string) {
        this.rootApp.set('view engine', name);
    }
}