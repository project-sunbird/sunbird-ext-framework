import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseModule, CourseComponent } from 'enroll';
import { DashboardModule, DashboardComponent } from 'dashboard';
import { HomeModule, HomeComponent } from 'home';
import { MenuModule } from 'menu';
import { BrowserModule } from '@angular/platform-browser';

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

export const plugins = {
    declarations: [
      AppComponent,
      DashboardComponent,
      CourseComponent,
      HomeComponent
    ],
    imports: [
      BrowserModule,
      CourseModule,
      DashboardModule,
      MenuModule,
      RouterModule.forRoot(
        routerConfig,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    providers: [],
    bootstrap: [AppComponent]
};

