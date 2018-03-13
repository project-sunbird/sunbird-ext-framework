import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFrameworkConfig, Framework } from 'web-framework';
import { Manifest } from 'web-framework/manager/PluginManager';
import { ClientPlugin } from "./Client";
import { manifest } from "./manifest";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CourseModule {
  constructor() {
    let config: IFrameworkConfig = { manifest: <Manifest>manifest, pluginClass: ClientPlugin }
    Framework.initialize([config]);
  }
}
