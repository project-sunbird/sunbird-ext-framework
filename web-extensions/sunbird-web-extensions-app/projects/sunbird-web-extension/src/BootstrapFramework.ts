import { PluginService } from './plugin-service';
import { Injectable } from '@angular/core';

@Injectable()
export class BootstrapFramework {

  private config: any;

  private pluginService: PluginService;

  constructor(pluginService: PluginService) {
    this.pluginService = pluginService;
  }

  initialize(config: any) {
    this.config = config;
    this.pluginService.loadPlugins(this.config);
  }
}
