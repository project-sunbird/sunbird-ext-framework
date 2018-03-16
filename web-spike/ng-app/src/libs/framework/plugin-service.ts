import {Injectable} from '@angular/core';
import {PluginData} from './models';
import {ReplaySubject} from 'rxjs/Rx';
import { TaskPlugin } from '../../plugins/task-plugin/plugin';
import { SidebarPlugin } from '../../plugins/sidebar-plugin/plugin';

export interface FrameworkConfig {
  plugins: Array<any>
}

@Injectable()
export class PluginService {
  public plugins
  public change  
  private config

  constructor() {
    this.plugins = [];
    this.change = new ReplaySubject(1);
    this.loadPlugins([TaskPlugin, SidebarPlugin])
  }

  loadPlugins(plugins) {
    for(let plugin of plugins) {
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

  removePlugin(name) {
    const plugin = this.plugins.find((plugin) => plugin.name === name);
    if (plugin) {
      const plugins = this.plugins.slice();
      plugins.splice(plugins.indexOf(plugin), 1);
      this.plugins = plugins;
      this.change.next(this.plugins);
    }
  }

  getPluginData(slot) {
    return this.plugins.reduce((components, pluginData) => {
      return components.concat(
        pluginData.config.placements
          .filter((placement) => placement.slot === slot)
          .map((placement) => new PluginData(pluginData, placement))
      );
    }, []);
  }
}
