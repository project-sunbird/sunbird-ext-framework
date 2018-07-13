# Overview

**simple**, **fast**, **effective** way to build pluggable modules using [node.js](https://nodejs.org/en/). It can be integrated to the main application as simple as npm modules. You can develop/test/publish modules independently irrespective of the main application. 

## Sections:
1. [Setup](https://github.com/ekstep/ext-framework/tree/master/server#setup)
2. [Getting started](https://github.com/ekstep/ext-framework/tree/master/server#getting-started)
    * [writing your first plugin](https://github.com/ekstep/ext-framework/tree/master/server#writing-your-first-plugin)
3. [Debugging](https://github.com/ekstep/ext-framework/tree/master/server#debugging)
4. [Testing](https://github.com/ekstep/ext-framework/tree/master/server#testing)
5. npm link vs npm install for local modules
6. Contributors



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
2. link `ext-framework` library to the plugin, run `npm link <path-from-root>/ext-framework/server/dist`
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


## Debugging:
Demo app runs in `debug` mode enabled. Latest `node.js` supports `--inspect` flag to run the app in debug mode. To debug the app, start the demo app and open the `chrome` developer console and search for `node.js` icon next to `Elements` tab and click on it. It opens devTool for node.js in a new window.


## Testing:
cd `server` and run `npm run test`. It generates `HTML` reporter inside folder `server/mochawesome-report` using `mochawesome` reporter. 


## Generate Code Document:
1. run `npm run gen-doc` (generates `docs` folder in root directory)


## `npm link` vs `npm install` for local modules:
 To save development time, we have to link the local dependencies such as plugins and framework libraries rather than installing it as a dependency by declaring it in the `package.json`. If we declare local dependencies in `package.json`, it will install only once and when we make any changes to local modules, we need to re-install the dependencies again by `npm install`.

 `npm link` creates symbolic link to actual module. Any changes to source module is immediately reflected and saves our time.

 However, this is not the case when publishing the library. Each plugin should have `peerDependencies` section where it should declare `ext-framework` as its dependency with its version no.  

## Note to Contributors:
This project was built using [Visual Source Code](https://code.visualstudio.com/). Contributors are recommended to use this editor and install the "recommended" extensions from the `VScode Extensions`.
