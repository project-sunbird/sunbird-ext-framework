import { ExtensionPointDirective } from './extension-point.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginService } from './plugin-service';
import { BootstrapFramework } from './BootstrapFramework';

@NgModule({
  declarations: [
    ExtensionPointDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ExtensionPointDirective
  ],
  providers: [
    PluginService,
    BootstrapFramework
  ],
  entryComponents: []
})
export class WebFrameworkModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebFrameworkModule,
      providers: [PluginService]
    };
  }
}


