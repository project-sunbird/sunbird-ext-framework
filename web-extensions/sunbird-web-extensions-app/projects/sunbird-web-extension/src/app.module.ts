import { ExtensionPointDirective } from './extension-point.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { PluginService } from './plugin-service';
import { BootstrapFramework } from './BootstrapFramework';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ExtensionPointDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExtensionPointDirective
  ]
})
export class WebExtensionModule {
  static forRoot(): ModuleWithProviders<WebExtensionModule> {
    return {
      ngModule: WebExtensionModule,
      providers: [PluginService, BootstrapFramework]
    };
  }
}


