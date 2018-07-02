import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';

export interface IAuthProvider {
  configure(options: any): void;
  authenticate(req: Request, res: Response, next: NextFunction): void; // for each request
  protect?(req: Request, res: Response, next: NextFunction): void;  // for specific request
}

export interface IAuthProviderConstructor {
  new(): IAuthProvider;
}