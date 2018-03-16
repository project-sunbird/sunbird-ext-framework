import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManagePluginComponent } from './manage-plugin/manage-plugin.component';
import { RouterModule, Routes } from '@angular/router';

import { TaskModule, TaskPlugin } from '../plugins/task-plugin/task-plugin/task.module';
import { SidebarModule, SidebarPlugin } from '../plugins/sidebar-plugin/sidebar.module';
import { WebFrameworkModule } from '../libs/framework/framework.module';
import { FrameworkConfig } from '../libs/framework/plugin-service';

let frameworkConfig: FrameworkConfig = {
  plugins: [TaskPlugin, SidebarPlugin]
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    WebFrameworkModule.forRoot(),
    TaskModule,
    SidebarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { 
  constructor() {
  }
}
