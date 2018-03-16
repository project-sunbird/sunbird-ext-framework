import { PluginConfig, PluginPlacement } from '../../libs/framework/models';
import { SidebarDetailsComponent } from './sidebar-details/sidebar-details.component';

@PluginConfig({
  name: 'sidebar-plugin',
  description: 'some description',
  placements: [
    new PluginPlacement({ slot: 'body-sidebar', priority: 1, component: SidebarDetailsComponent })
  ]
})
export class SidebarPlugin {
  constructor() {

  }
}
