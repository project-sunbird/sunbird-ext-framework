import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {PluginService} from '../../libs/framework/plugin-service';

@Component({
  selector: 'app-manage-plugin',
  templateUrl: './manage-plugin.component.html',
  styleUrls: ['./manage-plugin.component.css']
})
export class ManagePluginComponent implements OnInit {
	public plugins;
	public pluginService;	
  constructor(@Inject(PluginService) pluginService) {
    this.pluginService = pluginService;
    this.plugins = pluginService.change;
  }

  removePlugin(name) {
    this.pluginService.removePlugin(name);
  }

  loadPlugin(loadUrlInput) {
    this.pluginService.loadPlugin(loadUrlInput.value);
    loadUrlInput.value = '';
  }

  ngOnInit() {
  }

}
