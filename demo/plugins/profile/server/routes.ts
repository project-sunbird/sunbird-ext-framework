import framework from 'ext-framework/api';

export class Router {

	private static initialize(private app: any, private auth: any, private manifest: Manifest) {
		const server = framework.getPlugin(manifest.id);
		app.get('/user/v1/read/:id', auth.verifyTokenMiddleware(req, res, next), server.getUser(req, res));
		app.post('/user/v1/search', auth.verifyTokenMiddleware(req, res, next), server.searchUsers(req, res));
	}
}