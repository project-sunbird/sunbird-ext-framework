import {IRouter} from 'ext-framework-server/interfaces';
import {Manifest} from 'ext-framework-server/models/Manifest';

export class Router implements IRouter {

	init(app: any, auth: any, manifest: Manifest) {
		//const server = framework.getPlugin(manifest.id);
		app.get('/sample', (req, res, next) => {
			res.send('profile plugin router is invoked!');
		})
		//app.get('/user/v1/read/:id', auth.verifyTokenMiddleware(req, res, next), server.getUser(req, res));
		//app.post('/user/v1/search', auth.verifyTokenMiddleware(req, res, next), server.searchUsers(req, res));
	}
}