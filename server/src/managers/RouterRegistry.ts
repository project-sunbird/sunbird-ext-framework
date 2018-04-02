/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Router, Express } from 'express';
import { IRouteSchema, Manifest } from '../models/Manifest';
import { JwtAuthService } from '../auth';
import * as _ from 'lodash';
import { FrameworkConfig } from '..';
import { FrameworkError } from '../util';

export class RouterRegistry {
    private static rootApp: Express;
    private manifest: Manifest;
    private router: Router;
    private static routerInstances: Array<{ [key: string]: Router }> = [];
    private static contextParams: FrameworkConfig['secureContextParams'];
    private static tokenIssuerId: string = 'framework_router_service';

    static initialize(app: Express, contextParams: FrameworkConfig['secureContextParams']) {
        RouterRegistry.rootApp = app;
        RouterRegistry.contextParams = contextParams;
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
        router.use(RouterRegistry.signContext);
        RouterRegistry.routerInstances.push({ [manifest.id]: router })
        RouterRegistry.rootApp.use(manifest.server.routes.prefix, router);
        return router;
    }

    private static signContext(req, res, next) {
        if (req.get('signed-context')) {
            req.header['signed-context'] = req.get('signed-context')
            next();
        } else if (!_.isEmpty(RouterRegistry.getContextParams(req))) {
            JwtAuthService.generateToken(RouterRegistry.getContextParams(req), { issuer: RouterRegistry.tokenIssuerId, expiresIn: '1h' }).then((token) => {
                req.header['signed-context'] = token;
                next();
            }).catch((error) => {
                res.send({ status: "error", message: "Request could not be authenticated due to server error!" }).status(500);
            })
        } else {
            next();
        }
    }

    private static getContextParams(req: any): object {
        let returnObject: any = {};
        for (let param of RouterRegistry.contextParams) {
            if (req.get(param)) returnObject[param] = req.get(param);
        }
        return returnObject;
    }
}