/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from "../models/Manifest";
import { FrameworkError, FrameworkErrors } from "../util";
import { IMetaDataProvider } from "../interfaces";

export class PluginRegistry {
    
    private metaDataProvider: IMetaDataProvider;

    constructor(metaDataProvider: IMetaDataProvider) {
        this.metaDataProvider = metaDataProvider;
    }

    public async register(manifest: Manifest) {
        throw new FrameworkError({code: FrameworkErrors.METHOD_NOT_IMPLEMENTED, message: 'PluginRegistry.register() method is not implemented'});
    }

    public async unregister() {

    }

    public async isRegistered() {

    }

    public async getStatus() {

    }

    public async updateStatus() {

    }


}