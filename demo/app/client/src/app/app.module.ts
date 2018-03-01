import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserProfileModule } from 'userProfile';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
