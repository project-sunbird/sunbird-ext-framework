import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import { PluginLoader } from '../../src/managers/PluginLoader';
import { defaultConfig } from '../../src/config'
import { IPlugin } from '../../src/interfaces';
import * as path from 'path';
import { FrameworkError } from '../../src/util';

chai.should()

describe('Class PluginLoader', () => {
  describe('loadPlugin method', () => {
    let pluginLoader: PluginLoader;
    let resolveStubFn = () => {
      return new Promise((resolve, reject) => {
        resolve();
      })
    };

    let rejectStubFn = () => {
      return new Promise((resolve, reject) => {
        reject();
      })
    };

    beforeEach(() => {
      let testConfig = { pluginBasePath: path.join(__dirname, '../data/plugins/'), plugins: [{ id: 'test-plugin', ver: '1.0' }] };
      pluginLoader = new PluginLoader()
      pluginLoader.initialize({ ...defaultConfig, ...testConfig });
    })

    it('should register the plugin', (done) => {
      let testPlugin: IPlugin = { id: 'test-plugin', ver: '1.0' };
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(resolveStubFn)
      let PluginRegistryStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(resolveStubFn);
      let loadDependenciesStub = Sinon.spy(pluginLoader, 'loadDependencies');

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          PluginRegistryStub.restore();
          buildPluginStub.restore();
          loadDependenciesStub.restore();
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(testPlugin.id).should.be.true;
          Sinon.assert.notCalled(loadDependenciesStub);
          done();
        })
        .catch(() => {
          PluginRegistryStub.restore();
          buildPluginStub.restore();
          loadDependenciesStub.restore();
        })
    });

    it('should unregister the plugin when buildPlugin method fails', (done) => {
      let testPlugin: IPlugin = { id: 'test-plugin', ver: '1.0' };
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(rejectStubFn)
      let registerStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(resolveStubFn);
      let unregisterStub = Sinon.stub(pluginLoader.pluginRegistry, 'unregister').callsFake(resolveStubFn);

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          buildPluginStub.restore();
          registerStub.restore();
          unregisterStub.restore();
          console.log('should not call this block!');
        })
        .catch((error) => {
          buildPluginStub.restore();
          registerStub.restore();
          unregisterStub.restore();
          // FIXME: Sinon.assert.calledOnce(unregisterStub);
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(testPlugin.id).should.be.false;
          error.message.should.to.be.equal('unable to load plugin!');
          done();
        })
    });

    it('should not load the plugin again if already loaded', (done) => {
      let testPlugin: IPlugin = { id: 'test-plugin', ver: '1.0' };
      let isPluginLoadedStub = Sinon.stub(pluginLoader, 'isPluginLoaded').returns(true);
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(resolveStubFn)
      let registerStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(resolveStubFn);

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          buildPluginStub.restore();
          registerStub.restore();
          isPluginLoadedStub.restore();
          Sinon.assert.notCalled(buildPluginStub);
          Sinon.assert.notCalled(registerStub);
          done();
        })
        .catch((error) => {
          buildPluginStub.restore();
          registerStub.restore();
          isPluginLoadedStub.restore();
          console.log(error);
        })
    });

    it('should load plugin dependencies', (done) => {
      let dependentPlugin: IPlugin = { id: 'dependent-plugin', ver: '1.0' };
      let testPlugin: IPlugin = { id: 'test-plugin-with-dependencies', ver: '1.0' };
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(resolveStubFn)
      let registerStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(resolveStubFn);
      let loadDependenciesStub = Sinon.spy(pluginLoader, 'loadDependencies');

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          registerStub.restore();
          buildPluginStub.restore();
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(testPlugin.id).should.be.true;
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(dependentPlugin.id).should.be.true;
          Sinon.assert.calledOnce(loadDependenciesStub);
          Sinon.assert.calledTwice(registerStub);
          Sinon.assert.calledTwice(buildPluginStub);
          done();
        })
        .catch((error) => {
          registerStub.restore();
          buildPluginStub.restore();
          console.log(error);
        })
    })

    it('should fail to load plugin if registry persistence fails', (done) => {
      let testPlugin: IPlugin = { id: 'test-plugin', ver: '1.0' };
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(resolveStubFn)
      let PluginRegistryStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(rejectStubFn);
      let loadDependenciesStub = Sinon.spy(pluginLoader, 'loadDependencies');

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          PluginRegistryStub.restore();
          buildPluginStub.restore();
          loadDependenciesStub.restore();
          console.log('should not call this!');
        })
        .catch((error) => {
          PluginRegistryStub.restore();
          buildPluginStub.restore();
          loadDependenciesStub.restore();
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(testPlugin.id).should.be.false;
          Sinon.assert.notCalled(loadDependenciesStub);
          Sinon.assert.notCalled(buildPluginStub);
          error.message.should.to.be.equal('unable to register plugin!');
          done();
        })
    })

    it('should fail to load plugin if dependencies fails to load', (done) => {
      let dependentPlugin: IPlugin = { id: 'dependent-plugin', ver: '1.0' };
      let testPlugin: IPlugin = { id: 'test-plugin-with-dependencies', ver: '1.0' };
      // when buildPlugin fails to load dependent plugin
      // this should stop loading the actual plugin
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(rejectStubFn) 
      let registerStub = Sinon.stub(pluginLoader.pluginRegistry, 'register').callsFake(resolveStubFn);
      let unregisterStub = Sinon.stub(pluginLoader.pluginRegistry, 'unregister').callsFake(resolveStubFn);
      let loadDependenciesStub = Sinon.spy(pluginLoader, 'loadDependencies');

      pluginLoader.loadPlugin(testPlugin)
        .then(() => {
          registerStub.restore();
          buildPluginStub.restore();
          unregisterStub.restore();
          loadDependenciesStub.restore();
        })
        .catch(() => {
          registerStub.restore();
          buildPluginStub.restore();
          unregisterStub.restore();
          loadDependenciesStub.restore();
          console.log('pluginLoader.isPluginLoaded(testPlugin.id)', pluginLoader.isPluginLoaded(testPlugin.id));
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(testPlugin.id).should.be.false;
          // tslint:disable-next-line:no-unused-expression
          pluginLoader.isPluginLoaded(dependentPlugin.id).should.be.false;
          Sinon.assert.calledOnce(loadDependenciesStub);
          Sinon.assert.calledOnce(registerStub);
          // Sinon.assert.calledTwice(unregisterStub);
          Sinon.assert.calledOnce(buildPluginStub);
          done();
        })
    })
  })
})