import { IRouter } from '@project-sunbird/ext-framework-server/interfaces';
import { Manifest } from '@project-sunbird/ext-framework-server/models/Manifest';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { Server } from './server';
import { RequestValidator } from './RequestValidator';

export class Router implements IRouter {

	init(app: any, manifest: Manifest, auth?: any) {
		const server: Server = frameworkAPI.getPluginInstance(manifest.id);
    const validator: RequestValidator = new RequestValidator();
    app.post('/create', validator.validateCreateProgramAPI, (req, res) => server.createProgram(req, res));
    app.get('/read/:programId', validator.validateReadProgramAPI, (req, res) => server.readProgram(req, res));
    app.patch('/update', validator.validateUpdateProgramAPI, (req, res) => server.updateProgram(req, res));
    app.delete('/delete', validator.validateDeleteProgramAPI, (req, res) => server.deleteProgram(req, res));
    app.post('/add/participant', validator.validateAddParticipantAPI, (req, res) => server.addParticipant(req, res));
    app.patch('/update/participant', validator.validateUpdateParticipantAPI, (req, res) => server.updateParticipant(req, res));
	}
}