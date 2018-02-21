import {IRouter} from 'ext-framework-server/interfaces'
import {Manifest} from 'ext-framework-server/models/Manifest'
import { Request, Response } from 'express';
import { IProfileService } from './server';

export class Router implements IRouter {

	init(app: any, auth: any, manifest: Manifest) {
		const server = <IProfileService> {};//framework.getPlugin(manifest.id);
		app.get('/user/v1/read/:id', auth.verifyTokenMiddleware, (req: Request, res: Response) => server.getUser(req, res));
		app.post('/user/v1/search', auth.verifyTokenMiddleware, (req: Request, res: Response) =>server.searchUsers(req, res));
	}
}