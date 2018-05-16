import { Injectable } from '@angular/core';
import { PluginData } from './models';
import { ReplaySubject } from 'rxjs';
import { PluginPlacement } from 'sunbird-web-extension';

export interface IPluginData {
  type: IPluginClass;
  config: IPluginClass['_pluginConfig'];
  instance: new () => IPluginClass;
}

export interface IPluginClass {
  new();
  _pluginConfig?: IPluginConfig;
}

export interface IPluginConfig {
  name: string;
  description: string;
  placements: Array<PluginPlacement>;
}


@Injectable()
export class PluginService {
  public plugins: Array<IPluginData>;
  public change;
  private config;

  constructor() {
    this.plugins = [];
    this.change = new ReplaySubject(1);
  }

  loadPlugins(config: any): void {
    if (!config || !Array.isArray(config.plugins)) {
      throw new Error('invalid framework configuration! Failed to load plugins!');
    }

    const plugins = config.plugins.map((data) => data.main);
    for (const plugin of plugins) {
      this.loadPlugin(plugin);
    }
  }

  loadPlugin(plugin: IPluginClass): void {
    const pluginData: IPluginData = {
      type: plugin,
      config: plugin._pluginConfig,
      instance: new plugin()
    };
    this.plugins = this.plugins.concat([pluginData]);
    this.change.next(this.plugins);
  }

  removePlugin(name: string): void {
    const plugin = this.plugins.find((pluginObj) => pluginObj.config.name === name);
    if (plugin) {
      const plugins = this.plugins.slice();
      plugins.splice(plugins.indexOf(plugin), 1);
      this.plugins = plugins;
      this.change.next(this.plugins);
    }
  }

  getPluginData(name: string): Array<PluginData> {
    return this.plugins.reduce((components, pluginData) => {
      return components.concat(
        pluginData.config.placements
          .filter((placement) => placement.name === name)
          .map((placement) => new PluginData(pluginData, placement))
      );
    }, []);
  }
}
