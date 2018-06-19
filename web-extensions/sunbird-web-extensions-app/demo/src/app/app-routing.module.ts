import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { GettingstartedComponent } from './gettingstarted/gettingstarted.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';
import { DevGuidesComponent } from './dev-guides/dev-guides.component';
import { SetUpComponent } from './set-up/set-up.component';
import { IntroAngularSixComponent } from './intro-angular-six/intro-angular-six.component';
import { SamplePluginComponent } from './sample-plugin/sample-plugin.component';
import { IntegrationPluginComponent } from './integration-plugin/integration-plugin.component';
import { BuildPluginComponent } from './build-plugin/build-plugin.component';
import { PluginArchitectureComponent } from './plugin-architecture/plugin-architecture.component';
import { PluggagbleUiComponentsComponent } from './pluggagble-ui-components/pluggagble-ui-components.component';
import { ImplementingPluginApiComponent } from './implementing-plugin-api/implementing-plugin-api.component';
import { AdditionalDocumentationComponent } from './additional-documentation/additional-documentation.component';



const routes: Routes = [
  { path: 'introduction', component: IntroComponent },
  { path: 'portal', component: IntroComponent },
  { path: 'getting-started', component: GettingstartedComponent },
  { path: 'setup', component: SetUpComponent },
  { path: 'plugin-architecture', component: PluginArchitectureComponent },
  { path: 'pluggagble-ui-components', component: PluggagbleUiComponentsComponent},
  { path: 'implementing-plugin-api', component: ImplementingPluginApiComponent},
  { path: 'build-plugin', component: BuildPluginComponent },
  { path: 'introduction-angular-6', component: IntroAngularSixComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'sample-plugin', component: SamplePluginComponent },
  { path: 'integrate-plugin-with-portal', component: IntegrationPluginComponent },
  { path: 'api-docs', component: ApiDocsComponent },
  { path: 'additional-documentation', component: AdditionalDocumentationComponent },
  { path: 'dev-guides', component: DevGuidesComponent },
  { path: '', redirectTo: '/introduction', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
