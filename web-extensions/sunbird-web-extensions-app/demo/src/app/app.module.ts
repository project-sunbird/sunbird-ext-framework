import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { MenusComponent } from './menus/menus.component';
import {RouterModule} from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { GettingstartedComponent } from './gettingstarted/gettingstarted.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';
import { DevGuidesComponent } from './dev-guides/dev-guides.component';
import { SetUpComponent } from './set-up/set-up.component';
import { IntroAngularSixComponent } from './intro-angular-six/intro-angular-six.component';
import { SamplePluginComponent } from './sample-plugin/sample-plugin.component';
import { IntegrationPluginComponent } from './integration-plugin/integration-plugin.component';
import { CodeblockComponent } from './codeblock/codeblock.component';
import { BuildPluginComponent } from './build-plugin/build-plugin.component';
import { PluginArchitectureComponent } from './plugin-architecture/plugin-architecture.component';
import { PluggagbleUiComponentsComponent } from './pluggagble-ui-components/pluggagble-ui-components.component';
import { ImplementingPluginApiComponent } from './implementing-plugin-api/implementing-plugin-api.component';
import { AdditionalDocumentationComponent } from './additional-documentation/additional-documentation.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenusComponent,
    IntroComponent,
    GettingstartedComponent,
    TutorialComponent,
    ApiDocsComponent,
    DevGuidesComponent,
    SetUpComponent,
    IntroAngularSixComponent,
    SamplePluginComponent,
    IntegrationPluginComponent,
    CodeblockComponent,
    BuildPluginComponent,
    PluginArchitectureComponent,
    PluggagbleUiComponentsComponent,
    ImplementingPluginApiComponent,
    AdditionalDocumentationComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    SuiModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
