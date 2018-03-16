import { NgcPluginSlotDirective } from './ngc-plugin-slot.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { PluginService, FrameworkConfig } from './plugin-service';

@NgModule({
  declarations: [
    NgcPluginSlotDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    NgcPluginSlotDirective
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
};

