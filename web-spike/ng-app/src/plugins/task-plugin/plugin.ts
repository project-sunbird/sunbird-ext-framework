import { PluginConfig, PluginPlacement } from '../../libs/framework/models';
import { TaskPluginComponent } from './task-plugin/task-plugin.component';
import { HomeMenuComponent } from './home-menu/home-menu.component'
import { AboutMenuComponent } from './about-menu/about-menu.component';
import { HomeBodyComponent } from './home-body/home-body.component';

@PluginConfig({
  name: 'task-plugin',
  description: 'some description',
  placements: [
    new PluginPlacement({ slot: 'task-info', priority: 1, component: TaskPluginComponent }),
    new PluginPlacement({ slot: 'nav-link', priority: 1, component: HomeMenuComponent }),
    new PluginPlacement({ slot: 'nav-link', priority: 1, component: AboutMenuComponent })
  ]
})
export class TaskPlugin {
  constructor() {

  }
}