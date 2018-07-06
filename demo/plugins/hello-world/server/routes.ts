import { Manifest } from 'ext-framework-server/models/Manifest';
import { Framework } from 'ext-framework-server';

export class Router {
	init(app: any, manifest: Manifest, auth?: any) {
		const server = Framework.api.getPluginInstance(manifest.id);
		app.get('/get', (req, res, next) => { server.sayHello(req, res, next) })
	}
}