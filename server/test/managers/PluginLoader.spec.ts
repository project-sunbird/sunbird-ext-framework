import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import { PluginLoader } from '../../src/managers/PluginLoader';
import { defaultConfig } from '../../src/config'
import { FrameworkConfig, IPlugin } from '../../src';
import * as path from 'path';
import { PluginRegistry } from '../../src/managers/PluginRegistry';

chai.should()

describe('Class PluginLoader', () => {
  describe('loadPlugin method', () => {
    let pluginLoader: PluginLoader;
    before(() => {
      let testConfig = { pluginBasePath: path.join(__dirname, '../data/plugins/'), plugins: [{ id: 'test-plugin', ver: '1.0'}] };
      pluginLoader = new PluginLoader({ ...defaultConfig, ...testConfig })
    })

    it('should register the plugin', (done) => {
      let testPlugin: IPlugin = { id: 'test-plugin', ver: '1.0'};
      let stubFn = () => {
        return new Promise((resolve, reject) => {
          resolve();
        })
      };
      let buildPluginStub = Sinon.stub(pluginLoader, 'buildPlugin').callsFake(stubFn)
      let PluginRegistryStub = Sinon.stub(PluginRegistry, 'register').callsFake(stubFn);

      pluginLoader.loadPlugin(testPlugin).then(() => {
        pluginLoader.isPluginLoaded(testPlugin.id).should.be.true;
        PluginRegistryStub.restore();
        buildPluginStub.restore();
        done();
      })
      .catch((error) => {
        PluginRegistryStub.restore();
        buildPluginStub.restore();
      })
    })

    it('should not register the plugin if already registered and throw error', () => {

    })

    it('should load plugin dependencies', () => {

    })

    it('should not call loadDependecies if dependencies are not defined', () => {

    })

    it('should fail to load plugin if instantiation or registry fails', () => {

    })
  })
})