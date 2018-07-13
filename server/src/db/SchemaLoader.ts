/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import {ISchemaLoader} from './ISchemaLoader'
import { Singleton } from 'typescript-ioc';
@Singleton
export class SchemaLoader {

	private loaders:{ [key:string]:ISchemaLoader; } = {};

	public registerLoader(loader: ISchemaLoader) : void {
		this.loaders[loader.getType()] = loader;
	}

	public getLoader(type: string) : ISchemaLoader {
		return this.loaders[type.toLowerCase()];
	}
}