# Overview

**simple**, **fast**, **effective** way to build pluggable modules using [node.js](https://nodejs.org/en/). It can be integrated to the main application as simple as npm modules. You can develop/test/publish modules independently irrespective of the main application. 

## Sections:
1. [Setup](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#setup)
2. [Getting started](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#getting-started)
    * [writing your first plugin](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#writing-your-first-plugin)
3. [Plugin lifecycle](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#plugin-lifecycle)    
4. [Debugging](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#debugging)
5. [Testing](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#testing)
6. [Publishing plugins](https://github.com/project-sunbird/sunbird-ext-framework/tree/master/server#publishing-plugins)
7. npm link vs npm install for local modules
8. Contributors



## Setup 
  1. Download `Apache Cassandra` v3.7 or higher
  2. Download `Elasticsearch` v6.1
  3. Download `Node.Js` v6.4 or higher
  4. install nodemon globally: `npm i nodemon -g` (optional)
  
## Getting started

To run the demo app with default plugins. Follow the instructions.

1. Clone the repo.
2. Start the `Cassandra` and `Elasticsearch` server.
3. cd `ext-framework/server` and run `npm install`.
4. create framework build by running `npm run build`,
5. go to `demo`>`app` folder (app) and run `npm install`.
6. link `ext-framework` library to the demo app. go to `demo`>`app` and run `npm link ../../server/dist`

// Plugins

1. go to plugins folder `demo/plugins/hello-world/server` and run `npm install`
2. run `npm i @project-sunbird/ext-framework-server`.
3. create build of the plugin by running `npm run build`

// link each plugin to demo app

>NOTE: `demo/app/index.ts` has Framework configuration to decide which plugin to load from the app. Change this file accordingly to load the plugins

1.    `cd demo/app` and run `npm link ../plugins/hello-world/server/dist`
2.    And run `npm run start`. Demo application starts by loading "hello-world" plugin

### Writing your first plugin:
In this tutorial, we are going to write simple API endpoint which will respond as "hello world" when we send request. Along this tutorial we will learn about folder structure and conventions to write plugin. Later we will write complex plugins using `cassandra` and `Elasticsearch` Database.

I believe the setup is ready as instructed above.

* Now go to folder `demo/plugins` and create a new folder called **"hello-world"**
* create a new folder inside `./helo-world` called `server`
* cd `./hello-world/server` & run `npm install typescript --save-dev`. copy the `build` script command from the below code snippet and add it to `package.json`

or 

copy the below file and paste it in `package.json` and run `npm install`

```javascript
{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "rm -rf ./dist && tsc --noImplicitUseStrict && cp package.json ./dist",
    "test": "echo 'go to '../test' folder to execute test cases!'"
  },
  "dependencies": {
  },
  "devDependencies": {
  	"typescript": "^2.7.1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


```

* since, we are going to write our code in typescript, we need `tsconfig.json` file to configure typescript compiler.

create tsconfig.json file inside current folder and paste the below code:

```Javascript
{
    "compilerOptions": {
        "module": "commonjs",
        "declaration": true,
        "outDir": "./dist",
        "target": "es6"
    },
    "exclude": [
        "node_modules",
        "./**/*.spec.ts"
    ]
}
```
 
* Lets link framework library to plugin using npm link, run `npm link <path-from-root>/ext-framework/server/dist`.
* create `server.ts` inside `./hello-world/server`

copy paste the below code: 

``` Javascript
export class Server {
  public sayHello(req, res, next) {
    res.status(200)
    .send('Hello world')
  }
}
```
here, we have created a class called `Server` and method called `sayHello()` which is a `express.js` middleware function, which returns 'hello world' when we send the request. This file is called `Entry Point` file of the plugin. The class name should be kept as `Server` and should be exported as above. 

* create an another file inside `./hello-world/server` called `routes.ts` to mention the routes for our plugin

copy paste the below code: 

``` Javascript
import { Manifest } from 'ext-framework-server/models/Manifest';
import { frameworkAPI } from 'ext-framework-server/api';

export class Router {
	init(app: any, manifest: Manifest, auth?: any) {
		const server = frameworkAPI.getPluginInstance(manifest.id);
		app.get('/get', (req, res, next) => { server.sayHello(req, res, next) })
	}
}
```

Here, we have imported 'Framework' which is an API of the extensible framework and 'Manifest' is just a type.
Class name should be kept as `Router` and it should have a `init` method which takes 3 parameters:

1. app: express app instance
2. manifest: `manifest` of the plugin, explained in below section
3. auth (optional): auth module instance to authenticate the request.

Inside init method, we will get the plugin instance created by the framework (when it instantiates the plugin during plugin load phase)  by passing `manifest.id` which is plugin Id and we are calling `sayHello()` method when we get the request from the app.

*. Lets create `manifest.ts` file inside `./hello-world/server/` which looks like this:

```javascript
export const manifest = {
  "id": "hello-world",
  "name": "simple hello world plugin",
  "author": "sunil<sunils@ilimi.in>",
  "version": "1.0",
  "server": {
    "routes": {
      "prefix": "/hello"
    }
  }
}
```
Manifest should have a unique id, name of the plugin, author name and version. It has server section where we can define prefix for all the endpoint defined in our plugin. Here, we have defined the prefix as `/hello` so, our final endpoint for "GET" request would look like `GET /hello/get`.

* Lets build the plugin, run `npm run build`.
* check the above command has created a `./dist` folder.
* Folder structure of our plugin will look like this:

```text
./hello-world
  |- server
      |-dist
      |-node_modules
      |-manifest.ts
      |-server.ts
      |-router.ts
      |-package.json
      |-tsconfig.json
```

**Lets Intergrate plugin to the app:**

Lets go to `ext-framework/demo/app/index.ts` where we keep our framework configuration file. It tells framework to load list of plugins declared and other config settings related to server. We have add an entry of our new plugin `hello-world` and link our plugin build to the app.

* cd `ext-framework/demo/app` folder and run `npm link <path-from-root>/ext-framework/demo/plugins/hello-world/server/dist` 
* run `npm link <path-from-root>/ext-framework/server/dist` from the current folder

Now we have linked framework module and our plugin module to the app.

* lets start our app , run `npm run start`

it should show the logs like this:

```text
[2018-07-06T16:46:36.140] [INFO] default - loading schema for plugin:  core
[2018-07-06T16:46:36.293] [INFO] default - no Cassandra schema change detected for plugin "core"!
[2018-07-06T16:46:36.294] [INFO] default - loading registry schema
[2018-07-06T16:46:36.294] [INFO] default - Framework is initialized!
[2018-07-06T16:46:36.295] [INFO] default - --------loding-plugin-hello-world-------
[2018-07-06T16:46:36.481] [INFO] default - Plugin "hello-world" is registered!
[2018-07-06T16:46:36.640] [INFO] default - --------load-complete-hello-world-------
[2018-07-06T16:46:36.640] [INFO] default - All plugins are loaded!
=====> Application running on port: 4000
```

* go to browser `http://localhost:4000/hello/get` and hit enter. You should see the response from our plugin as "hello world"

## Plugin Lifecycle:

It is important to understand the lifecycle of a plugin to understand deeper workings of framework internals. There are 4 stages:

1. Loading
2. Activation
3. Running
4. Closing

### 1. Loading:

During this phase, the framework tries to read the `manifest.ts` file under plugin's home directory. If the `manifest.ts` file is not found, the framework fails to load the plugin. When it finds the `manifest.ts` file, it will register the plugin in "plugin registry" and update the status of the plugin as `REGISTERED`. 

When the plugin has dependencies on other plugins, the framework would load all the dependencies mentioned in the `manifest.ts` file (in `dependencies` section) before loading the actual plugin. when any one of its dependencies are not met or causes an error during loading, it would not load the actual plugin and it wouldn't add an entry into "plugin registry".

Once a plugin is in `REGISTERED` state, the framework tries to locate if any schema files are defined in the `manifest.ts` file. If the plugin has not defined any schema file, the framework would skip this step. If there are schema files, then it would try to create a schema(tables/index) on the corresponding database provided based on the schema definition. If the schema is already defined in the database, it would not try to re-create the same, keeping it as is.  
Once the schema is set in the database it cannot be changed simply by changing the schema definition json and reloading the plugin again. In order to change the already existing schema, the user needs to migrate the old schema to new schema (currenlty, we have to do this manually) and change the schema definition json in the plugin and reload the plugin.

`server.ts` is the entry file of a plugin. This file should export class named `Server`. Framework loads this class and creates a new instance of it. It passes plugin manifest (from `manifest.ts`) object to the plugin through its constructor. The framework holds this runtime instance through out the lifecycle. And it is available to the plugin to access it.

The framework tries to find `routes.ts` file under the plugin home directory. If the file is not found, the plugin fails to load. The file should export class named `Router`. The framework registers the routes(end point) defined for the plugin with the "prefix" defined in the `manifest.ts` file.

**To sum it up:**

These are the list of task framwork does when loading the plugin:

1. Register plugin
2. Resolve dependencies
3. Create database schema (if any)
4. Create runtime plugin instance
5. Register plugin routes  

### 2. Activation: 

The Framework activates the plugin when it finish loading the list of plugin defined in the configuration file. Before that framework creates an instance (runtime Js Object) of the plugin when it successfully loads. The plugin instances is handled by the framework inorder to communicate with the plugin about its lifecycle events. The plugin should have lifecycle hook methods inorder to take actions when it is called from the framework. E.g when the framework is shuting down, it should inform all the plugins through the lifecycle method to indicate the action so that plugin can perform some task before it gets killed.

Currently there are only 2 lifecycle methods which plugin has to implement:

1. `onStart()`: To indicate plugin is active and available to serve the request.
2. `onStop()`: Plugin is being stopped due to maintanence or some other reason and it is no longer available to serve the request.


### 3. Running:

During this stage, plugin is available to serve the request. Framework doesn't have any control over the functional working of the plugin. Web request specific to the plugin is directed to plugin middleware to handle the request. 

### 4. Closing:

Currently we don't have a way to bring down the individual plugins for maintainence when it is loaded along with other plugins. when we try to terminate the framework, it informs about the event to all the registered plugins through lifecycle hook methods. 

## Debugging:
Demo app runs in `debug` mode enabled. Latest `node.js` supports `--inspect` flag to run the app in debug mode. To debug the app, start the demo app and open the `chrome` developer console and search for `node.js` icon next to `Elements` tab and click on it. It opens devTool for node.js in a new window.

## Testing:
cd `server` and run `npm run test`. It generates `HTML` reporter inside folder `server/mochawesome-report` using `mochawesome` reporter. 

## Publishing plugins:
Plugins can be plublished as npm modules.

1. Create plugin build (`/dist` folder) using `npm run build` command.
2. Add version, description, name of plugin, license in `package.json`.
3. Copy `package.json`, `readme.md` file to the `dist` folder.
4. Login to npm using CLI.
5. Publish the package to NPM.


## Generate Code Document:
1. run `npm run gen-doc` (generates `docs` folder in root directory)


## `npm link` vs `npm install` for local modules:
 To save development time, we have to link the local dependencies such as plugins and framework libraries rather than installing it as a dependency by declaring it in the `package.json`. If we declare local dependencies in `package.json`, it will install only once and when we make any changes to local modules, we need to re-install the dependencies again by `npm install`.

 `npm link` creates symbolic link to actual module. Any changes to source module is immediately reflected and saves our time.

 However, this is not the case when publishing the library. Each plugin should have `peerDependencies` section where it should declare `ext-framework` as its dependency with its version no.  

## Note to Contributors:
This project was built using [Visual Source Code](https://code.visualstudio.com/). Contributors are recommended to use this editor and install the "recommended" extensions from the `VScode Extensions`.
