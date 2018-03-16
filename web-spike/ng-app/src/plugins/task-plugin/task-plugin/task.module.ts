import { NgModule } from "@angular/core";
import { TaskPluginComponent } from "./task-plugin.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HomeMenuComponent } from "../home-menu/home-menu.component";
import { AboutMenuComponent } from "../about-menu/about-menu.component";
import { HomeBodyComponent } from "../home-body/home-body.component";
import { AboutBodyComponent } from "../about-body/about-body.component";
import { WebFrameworkModule } from "../../../libs/framework/framework.module";

const appRoutes: Routes = [
    { path: 'taskroute', component: TaskPluginComponent },
    { path: 'home', component: HomeBodyComponent },
    { path: 'about', component: AboutBodyComponent }
  ];

@NgModule({
  declarations: [
    TaskPluginComponent,
    HomeMenuComponent,
    AboutMenuComponent,
    HomeBodyComponent,
    AboutBodyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    WebFrameworkModule.forRoot()
  ],
  providers: [
  ],
  entryComponents: [
    TaskPluginComponent, 
    HomeMenuComponent, 
    AboutMenuComponent, 
    HomeBodyComponent,
    AboutBodyComponent]
})
export class TaskModule { }
export * from '../plugin';