import { Manifest } from 'ext-framework-server/models/Manifest';
import { frameworkAPI } from 'ext-framework-server/api';

export class Router {
	init(app: any, manifest: Manifest, auth?: any) {
		const server = frameworkAPI.getPluginInstance(manifest.id);
		app.get('/get', (req, res, next) => { server.sayHello(req, res, next) })
	}
}