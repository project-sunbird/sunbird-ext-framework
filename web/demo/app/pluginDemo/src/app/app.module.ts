import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProfileComponent, UserProfileService, ProfileModule } from 'profile';
import { HttpClientModule } from '@angular/common/http';
import { FrameworkModule } from 'extframework';
const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ProfileModule,
    FrameworkModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
