import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes, Router } from "@angular/router";
import { WebFrameworkModule } from "../../libs/framework/framework.module";
import { TaskModule } from "../task-plugin/task-plugin/task.module";
import { SidebarDetailsComponent } from "./sidebar-details/sidebar-details.component";

@NgModule({
  declarations: [
    SidebarDetailsComponent
  ],
  imports: [
    BrowserModule,
    WebFrameworkModule.forRoot(),
    RouterModule
  ],
  providers: [
  ],
  entryComponents: [SidebarDetailsComponent]
})
export class SidebarModule { }
export * from './plugin'