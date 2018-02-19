import FrameworkAPI from 'ext-framework/api';
// export class Router {

// 	private static initialize(private app: any, private auth: any, private manifest: Manifest) {
// 		const server = framework.getPlugin(manifest.id);
// 		app.get('/user/v1/read/:id', auth.verifyTokenMiddleware(req, res, next), server.getUser(req, res));
// 		app.post('/user/v1/search', auth.verifyTokenMiddleware(req, res, next), server.searchUsers(req, res));
// 	}
// }

let routingObj = FrameworkAPI.routerRegistry.create({
	basePath: '/org.sunbird.profile',
	prefix: '/public',
	id: 'org.sunbird.profile'
});

routingObj.router.get('/', (req,res, next) => {
	res.send('Home')
})

routingObj.register()

