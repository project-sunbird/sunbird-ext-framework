import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { manifest } from './manifest';
import { Framework, IFrameworkConfig } from 'web-framework';
import { ClientPlugin } from './Client';
import { Manifest } from 'web-framework/manager/PluginManager';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserProfileComponent],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule {
  constructor() {
    let config: IFrameworkConfig = { manifest: <Manifest>manifest, pluginClass: ClientPlugin }
    Framework.initialize([config]);
  }
}
