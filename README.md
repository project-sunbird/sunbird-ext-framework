# ext-framework
Repo containing code for the Extensibility Framework of Sunbird.  To be moved to Sunbird.

## Server Framework:

### Setup 
  1. Download `Apache Cassandra` 3.7 or above
  2. Download `Elasticsearch` 6.1

### To see in Action

To run the demo app with default plugins. Follow the instructions.

1. Clone the repo.
2. Start the `Cassandra` and `Elasticsearch` server.
3. create `dist` for server framework. `cd server` and run `npm run build`,
4. go to `demo`>`app` folder (Node.Js app) and run `npm install`.
5. link demo plugin (profile-server) to the Node app dependency. `cd demo/app` and run `npm link ../plugins/profile/server/dist`. (If plugin `dist` is not already created inside plugin home folder, run `npm run build` command from plugin home.)
6. `cd demo/app` and run `npm serve`. Demo application starts by loading the demo plugin (profile-server).
