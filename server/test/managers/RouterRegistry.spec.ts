import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import * as Express from 'express';
import * as http_mocks from 'node-mocks-http';
import { RouterRegistry } from '../../src/managers/RouterRegistry';
import { Manifest } from '../../src/models/Manifest';
import { FrameworkError, FrameworkErrors } from '../../src/util';

chai.should()

describe('Class RouterRegistry', () => {
  describe('bindRouter method', () => {
    let app: any;
    let manifest: Manifest;
    before(() => {
      app = Express();
      manifest = new Manifest({ "id": "test-plugin", "name": "sunbird test plugin", "author": "sunil<sunils@ilimi.in>", "version": "1.0", "server": { "routes": { "prefix": "/somepath" }, "databases": [{ "type": "cassandra", "path": "db/cassandra", "compatibility": "~1.0" }, { "type": "es", "path": "db/es", "compatibility": "~1.0" }], "dependencies": [] } });
      RouterRegistry.initialize(app)
    })

    it('should create new Express Router object and attach it Express App', () => {
      let appStub = Sinon.stub(app, 'use').callsFake(() => {
        return true;
      })
      let router = RouterRegistry.bindRouter(manifest)
      Sinon.assert.calledWith(appStub, manifest.server.routes.prefix, router);
      appStub.restore();
    })

    it('should throw error if prefix is not defined in "Manifest" model', () => {
      let manifest = new Manifest({ "id": "test-plugin", "name": "sunbird test plugin", "author": "sunil<sunils@ilimi.in>", "version": "1.0", "server": { "databases": [{ "type": "cassandra", "path": "db/cassandra", "compatibility": "~1.0" }, { "type": "es", "path": "db/es", "compatibility": "~1.0" }], "dependencies": [] } });
      (() => {
        RouterRegistry.bindRouter(manifest)
      }).should.throw('cannot bind "Router" object to App')
    })
  })

  describe('threadLocal method', () => {
    let app: any;
    let manifest: Manifest;
    before(() => {
      app = Express();
      manifest = new Manifest({ "id": "test-plugin", "name": "sunbird test plugin", "author": "sunil<sunils@ilimi.in>", "version": "1.0", "server": { "routes": { "prefix": "/somepath" }, "databases": [{ "type": "cassandra", "path": "db/cassandra", "compatibility": "~1.0" }, { "type": "es", "path": "db/es", "compatibility": "~1.0" }], "dependencies": [] } });
      RouterRegistry.initialize(app)
    })

    it('should set "requestId" and "header" details for each request in local thread', (done) => {
      let request = http_mocks.createRequest({ method: 'GET', url: '/somepath/get' });
      let response = http_mocks.createResponse();
      let router = RouterRegistry.bindRouter(manifest);
      RouterRegistry.threadLocal(RouterRegistry.getThreadNamespace())(request, response, () => {
        // tslint:disable-next-line:no-unused-expression
        RouterRegistry.getThreadNamespace().get('requestId').should.be.a('string');
        // tslint:disable-next-line:no-unused-expression
        RouterRegistry.getThreadNamespace().get('headers').should.to.be.eql(request.headers);
        done();
      });
    });
  });
})