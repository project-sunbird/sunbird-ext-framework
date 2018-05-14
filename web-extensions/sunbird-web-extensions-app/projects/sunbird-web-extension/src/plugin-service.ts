import {Injectable} from '@angular/core';
import {PluginData} from './models';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class PluginService {
  public plugins;
  public change;
  private config;

  constructor() {
    this.plugins = [];
    this.change = new ReplaySubject(1);
  }

  loadPlugins(config: any) {
    if (!config || !Array.isArray(config.plugins)) {
      throw new Error('invalid framework configuration! Failed to load plugins!');
    }

    const plugins = config.plugins.map((data) => data.main);
    for (const plugin of plugins) {
      this.loadPlugin(plugin);
    }
  }

  loadPlugin(plugin) {
      const Plugin = <any>plugin;
      const pluginData = {
        type: Plugin,
        config: Plugin._pluginConfig,
        instance: new Plugin()
      };
      this.plugins = this.plugins.concat([pluginData]);
      this.change.next(this.plugins);
  }

  removePlugin(name: string) {
    const plugin = this.plugins.find((pluginObj) => pluginObj.name === name);
    if (plugin) {
      const plugins = this.plugins.slice();
      plugins.splice(plugins.indexOf(plugin), 1);
      this.plugins = plugins;
      this.change.next(this.plugins);
    }
  }

  getPluginData(name: string) {
    return this.plugins.reduce((components, pluginData) => {
      return components.concat(
        pluginData.config.placements
          .filter((placement) => placement.name === name)
          .map((placement) => new PluginData(pluginData, placement))
      );
    }, []);
  }
}
