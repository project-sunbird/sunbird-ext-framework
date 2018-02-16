/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { ISchemaLoader } from './ISchemaLoader';
export declare class SchemaLoader {
    private static loaders;
    static registerLoader(loader: ISchemaLoader): void;
    static getLoader(type: string): ISchemaLoader;
}
