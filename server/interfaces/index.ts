import { Router } from "express";
import { Manifest } from "../models/Manifest";

export interface IRouter {
    new () : IRouter;
    init(app: Router, auth: any, manifest: Manifest): void
}

export interface IServer {
    new(config: object, manifest: Manifest): IServer;
}