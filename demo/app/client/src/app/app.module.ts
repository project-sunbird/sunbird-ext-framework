import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Framework } from 'web-framework';
import { ClientPlugin } from 'profile';
import { manifest } from './manifest';
import { config } from './config';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Framework.initialize(manifest, ClientPlugin);

  }

}
