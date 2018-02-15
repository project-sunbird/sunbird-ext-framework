/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import {ISchemaLoader} from './ISchemaLoader'

export class SchemaLoader {

	private static loaders:{ [key:string]:ISchemaLoader; } = {};

	static registerLoader(loader: ISchemaLoader) : void {
		this.loaders[loader.getType()] = loader;
	}

	static getLoader(type: string) : ISchemaLoader {
		return this.loaders[type.toLowerCase()];
	}
}