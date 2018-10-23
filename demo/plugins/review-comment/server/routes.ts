import { IRouter } from '@project-sunbird/ext-framework-server/interfaces';
import { Manifest } from '@project-sunbird/ext-framework-server/models/Manifest';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { Server } from './server';
import { RequestValidator } from './RequestValidator';

export class Router implements IRouter {

	init(app: any, manifest: Manifest, auth?: any) {
		const server: Server = frameworkAPI.getPluginInstance(manifest.id);
    const validator: RequestValidator = new RequestValidator();
    app.post('/create/comment', validator.validateCreateCommentAPI, (req, res) => server.createComment(req, res));
    app.post('/read/comment', validator.validateReadCommentAPI, (req, res) => server.getCommentList(req, res));
    app.delete('/delete/comment', validator.validateDeleteCommentAPI, (req, res) => server.deleteComments(req, res));
	}
}