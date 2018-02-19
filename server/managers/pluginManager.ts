import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'
import * as nodeEval from 'node-eval'
import * as ts from 'typescript'
import * as shell from 'shelljs'
import {pluginRegistry} from './pluginRegistry'
import {Manifest} from '../models/Manifest';
import {ExtPlugin} from '../models/Plugin'
 

interface PluginInfo {
	id: string;
	ver: string;
	scope: string;
}

export interface IPluginRepoConfig {
	home: string;
	repo?: "local" | "published" | string;
}

export class PluginManager {
	private static instance: PluginManager;
	private pluginRepoConfig: IPluginRepoConfig;
	private _pluginInstances: Array<ExtPlugin>;
	private readonly pluginClassName = 'ExtPlugin';
	private readonly pluginFilePath = 'server/plugin.js';

	constructor(config: IPluginRepoConfig) {
		this.pluginRepoConfig = config;
	}

	public register(manifest: Manifest): void {
		pluginRegistry.register(manifest);
	}

	public getPluginFile(manifest: Manifest): string | null {
		if(pluginRegistry.isRegistered(manifest)) {
			let pluginFilePath: string = path.join(this.pluginRepoConfig.home, manifest.id, manifest.version, this.pluginFilePath);
			return this.readFileSync(pluginFilePath);
		}
	}

	public instantiatePlugin(manifest: Manifest) {
		if(pluginRegistry.isRegistered(manifest)) {
			this.loadDependencies(manifest).then(() => {
				let pluginInstance: ExtPlugin = this.createInstance(manifest, this.compilePlugin(manifest, this.getPluginFile(manifest)));
				if(pluginInstance.onLoad) pluginInstance.onLoad();
			})
			.catch((err) => {
				console.log(err);
			})
		} else {
			this.register(manifest);
			this.instantiatePlugin(manifest);
		}
	}

	private async loadDependencies(manifest: Manifest) : Promise<any> {
		return new Promise((resolve, reject) => {
			if (manifest.getDependencies().nodeModules) {
				let packageJsonPath = path.join(this.pluginRepoConfig.home, manifest.id, manifest.version, 'server/package.json');
				this.loadNodeModules(packageJsonPath, (err, res) => {
					if(res) {
						console.log(`node modules loaded for plugin: ${manifest.name}`);
						resolve(true);
					} else {
						reject(new Error(`unable to load node_modules for plugin: ${manifest.name} !`));
					}
				})
			}
		})
	}

	private loadNodeModules(packageJsonPath: string, callback = (...args: any[]) => { }) {
		let packageJsonExist = this.readFileSync(packageJsonPath);
		if (packageJsonExist) {
			shell.cd(packageJsonPath);
			console.log(`-------Installing NPM modules------`)
			shell.exec('npm install', (code: number, stdout: string, stderr: string) => {
				console.log('Program output:', stdout);
				console.log('Program stderr:', stderr);
				shell.cd('~')
				if (code !== 0) return callback(true, undefined)
				callback(undefined, true);
			})
		} else {
			callback(undefined, true)
		}
	}

	private compilePlugin(manifest: Manifest, source: string): ExtPlugin {
		let pluginFilePath: string = path.join(this.pluginRepoConfig.home, manifest.id, manifest.version, this.pluginFilePath);
		let output = nodeEval(source, pluginFilePath);
		return <ExtPlugin>output.ExtPlugin;
	}

	private createInstance(manifest: Manifest, pluginClass: ExtPlugin): ExtPlugin {
		let instance  = new ExtPlugin(manifest);
		this._pluginInstances.push(instance);
		return instance;
	}
	
	private readFileSync(path: string, format = 'utf8'): string | null {
		let fileData = null;
		try {
			fileData = fs.readFileSync(path, format)
		} catch (e) { }
		return fileData
	}
	

}