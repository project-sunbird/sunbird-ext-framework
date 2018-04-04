import { IRouter } from 'ext-framework-server/interfaces';
import { Manifest } from 'ext-framework-server/models/Manifest';
import { Framework } from 'ext-framework-server';
import { IProfileService } from './interfaces';

export class Router implements IRouter {

	init(app: any, manifest: Manifest, auth?: any) {
		const server = <IProfileService>Framework.api.getPlugin(manifest.id);
		app.get('/user/v1/readAll', (req, res) => { server.getAllUser(req, res) });
		app.get('/user/v1/read/:id', (req, res) => { server.getUser(req, res) });
		app.post('/user/v1/search', (req, res) => { server.searchUsers(req, res) });
		app.post('/user/v1/add', (req, res) => { server.setUser(req, res) });
	}
}