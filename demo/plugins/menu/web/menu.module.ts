import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { IFrameworkConfig, Framework } from 'web-framework';
import { Manifest } from 'web-framework/manager/PluginManager';
import { ClientPlugin } from './Client';
import { manifest } from './manifest';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {
  constructor() {
    let config: IFrameworkConfig = { manifest: <Manifest>manifest, pluginClass: ClientPlugin }
    Framework.initialize([config]);
  }

}
