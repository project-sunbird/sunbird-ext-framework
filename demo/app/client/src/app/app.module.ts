import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent, HomeModule, MenuComponent, MenuModule, CourseComponent, CourseModule, DashboardComponent, DashboardModule } from 'profile';

export const routerConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'enroll',
    component: CourseComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    HomeModule,
    // DashboardModule,
    // CourseModule,
    RouterModule.forRoot(
      routerConfig,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
