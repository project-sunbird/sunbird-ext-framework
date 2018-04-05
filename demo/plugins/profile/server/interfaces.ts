import { IServer } from 'ext-framework-server/interfaces';
import { Request, Response } from 'express';

export interface IProfileService extends IServer {
	getUser(req: Request, res: Response): void;
	searchUsers(req: Request, res: Response): void;
	setUser(req: Request, res: Response): void;
	getAllUser(req: Request, res: Response): void;
}