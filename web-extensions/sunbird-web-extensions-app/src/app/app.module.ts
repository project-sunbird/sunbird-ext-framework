import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebExtensionModule } from 'sunbird-web-extension';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebExtensionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
