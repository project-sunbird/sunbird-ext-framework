// AUTO GENERATED FILE

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseModule as EnrollModule, CourseComponent } from 'enroll';
import { DashboardModule, DashboardComponent } from 'dashboard';
import { HomeModule, HomeComponent } from 'home';
import { MenuModule } from 'menu';
import { BrowserModule } from '@angular/platform-browser';
import {AppConfig} from '../../AppConfig';
const routes = [];
const imports = [];
const routerConfig: Routes = [
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

  const ImportedModules = [
    { id: 'enroll', module: EnrollModule},
    { id: 'dashboard', module: DashboardModule},
    { id: 'menu', module: MenuModule}
  ];


  AppConfig.plugins.forEach((plugin) => {
    var nav = routerConfig.find((route) => {
      return route.path === plugin.id;
    });
    if (nav) {
      routes.push(nav);
    }
    var module = ImportedModules.find((mod) => {
      return mod.id === plugin.id;
    });
    if (module) {
      imports.push(module.module);
    }
  });

  routes.push({
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  });

  export const plugins = {
    declarations: [
      AppComponent,
      DashboardComponent,
      CourseComponent,
      HomeComponent
    ],
    imports: [BrowserModule, RouterModule.forRoot(routes), ...imports],
    providers: [],
    bootstrap: [AppComponent]
};

