import { Router } from "express";
import { Manifest } from "../models/Manifest";

export interface IRouter {
    init(app: Router, auth: any, manifest: Manifest): void
}

export interface IRouterConstructor {
    new () : IRouter;
}

export interface IServer {
    new(config: object, manifest: Manifest): IServer;
}