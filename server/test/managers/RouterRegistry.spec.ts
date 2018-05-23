import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import * as Express from 'express';

import { RouterRegistry } from '../../src/managers/RouterRegistry';
import { Manifest } from '../../src/models/Manifest';
import { FrameworkError, FrameworkErrors } from '../../src/util';

chai.should()

describe('Class RouterRegistry', () => {
  describe('bindRouter method', () => {
    let app, secureContextParams, manifest: Manifest;
    before(() => {
      app = Express();
      secureContextParams = ['x-authenticated-user-token', 'user-id', 'singned-context'];
      manifest = new Manifest({ "id": "test-plugin", "name": "sunbird test plugin", "author": "sunil<sunils@ilimi.in>", "version": "1.0", "server": { "routes": { "prefix": "/somepath" }, "databases": [{ "type": "cassandra", "path": "db/cassandra", "compatibility": "~1.0" }, { "type": "es", "path": "db/es", "compatibility": "~1.0" }], "dependencies": [] } });
      RouterRegistry.initialize(app, secureContextParams)
    })

    it('should create new Express Router object and attach it Express App', () => {
      let appStub = Sinon.stub(app, 'use').callsFake(() => {
        return true;
      })
      let router = RouterRegistry.bindRouter(manifest)
      Sinon.assert.calledWith(appStub, manifest.server.routes.prefix, router);
      appStub.restore();
    })

    xit('router object should have "signContext" middleware', () => {
      let appStub = Sinon.stub(app, 'use').callsFake(() => {
        return true;
      })
      let router = RouterRegistry.bindRouter(manifest)
      let SignContextMiddleware = router.stack.find((layer) => {
        return layer.name === 'signContext'
      });
      SignContextMiddleware.should.not.be.undefined;
      appStub.restore();
    })

    it('should throw error if prefix is not defined in "Manifest" model', () => {
      let manifest = new Manifest({ "id": "test-plugin", "name": "sunbird test plugin", "author": "sunil<sunils@ilimi.in>", "version": "1.0", "server": { "databases": [{ "type": "cassandra", "path": "db/cassandra", "compatibility": "~1.0" }, { "type": "es", "path": "db/es", "compatibility": "~1.0" }], "dependencies": [] } });
      (() => {
        RouterRegistry.bindRouter(manifest)
      }).should.throw('cannot bind "Router" object to App')
    })
  })
})