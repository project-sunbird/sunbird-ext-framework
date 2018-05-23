import { NextFunction } from 'express';

export interface IAuthProvider {
  configure(options: any): void;
  authenticate(req: Request, res: Response, next: NextFunction): void; // for each request
  protect?(req: Request, res: Response, next: NextFunction): void;  // for specific request
}