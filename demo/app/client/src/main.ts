import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ClientPlugin, manifest } from 'profile';
import { Framework } from 'web-framework';

if (environment.production) {
  enableProdMode();
}

Framework.initialize([{ manifest: <any>manifest, pluginClass: ClientPlugin}]);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
