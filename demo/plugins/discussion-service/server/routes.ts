import { IRouter } from '@project-sunbird/ext-framework-server/interfaces';
import { Manifest } from '@project-sunbird/ext-framework-server/models/Manifest';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { Server } from './server';
import { RequestValidator } from './RequestValidator';

export class Router implements IRouter {

	init(app: any, manifest: Manifest, auth?: any) {
		const server: Server = frameworkAPI.getPluginInstance(manifest.id);
    const validator: RequestValidator = new RequestValidator();
    app.post('/create/post', validator.validateCreatePostAPI, (req, res) => server.createPost(req, res));
    app.post('/read/post', validator.validateReadPostAPI, (req, res) => server.getPost(req, res));
    app.post('/delete/post', validator.validateDeletePostAPI, (req, res) => server.deletePost(req, res));
	}
}