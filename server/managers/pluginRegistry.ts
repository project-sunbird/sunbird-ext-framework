/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from "../models/Manifest";
import { FrameworkError, FrameworkErrors } from "../util";

export class PluginRegistry {
    static async register(manifest: Manifest) {
        throw new FrameworkError({code: FrameworkErrors.METHOD_NOT_IMPLEMENTED, message: 'PluginRegistry.register() method is not implemented'});
    }
}