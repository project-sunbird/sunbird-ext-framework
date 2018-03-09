import * as chai from 'chai';
import * as Sinon from 'sinon';
import 'mocha';
import { PluginManager } from '../../src/managers/PluginManager';
import { FrameworkConfig } from '../../src/interfaces';
import { PluginLoader } from '../../src/managers/PluginLoader';

chai.should();

var testConfig: FrameworkConfig = {
    db: {
       cassandra: {
           contactPoints: ['127.0.0.1'],
           keyspace: 'core_framework_schema',
           defaultKeyspaceSettings: {
               replication: {
                   'class': 'SimpleStrategy',
                     'replication_factor': '1'
               }
           }
       },
       elasticsearch: {
           host: "127.0.0.1:9200",
           disabledApis: ["cat", "cluster", "indices", "ingest", "nodes", "remote", "snapshot", "tasks"]
       }
   },
   plugins: [{id: 'test-plugin1', ver: '1.0'}, {id: 'test-plugin2', ver: '1.0'}],
   pluginBasePath: __dirname + '/node_modules/',
   port: 8000
};

describe('Class PluginManager', () => {
    
    describe('.load method', () => {
        it('should call loadPlugin when plugins are given', (done) => {
            let stub = Sinon.stub(PluginManager, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
            PluginManager.load(testConfig).then(() => {
                Sinon.assert.calledTwice(stub);
                stub.restore();
                done()
            });
        })

        it('should not call loadPlugin when plugins are not specified', (done) => {
            let stub = Sinon.stub(PluginManager, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
            let config = {...testConfig};
            config.plugins = [];
            PluginManager.load(config).then(() => {
                Sinon.assert.notCalled(stub);
                stub.restore();
                done()
            });
        })
    })

    describe('.getPluginInstance method', () => {
        it('should return plugin instance of plugin id', () => {
            class TestPlugin {}
            PluginManager.instances['test-plugin'] = new TestPlugin();
            let pluginInstance = PluginManager.getPluginInstance('test-plugin');
            pluginInstance.should.deep.equal(new TestPlugin());
        })
    })

    describe('.loadPlugin method', () => {
        it('should call PluginLoader.loadPlugin method', (done) => {
            let pluginLoader = new PluginLoader(testConfig);
            let plugin = {id: 'test-plugin', ver: '1.0'};
            PluginManager.initialize(pluginLoader);
            let stub = Sinon.stub(pluginLoader, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });

            PluginManager.loadPlugin(plugin).then(() => {
                Sinon.assert.calledWith(stub, plugin);
                stub.restore();
                done();
            });
        });

        it('should throw error when PluginLoader.loadPlugin method throws error!', (done) => {
            let pluginLoader = new PluginLoader(testConfig);
            let plugin = {id: 'test-plugin', ver: '1.0'};
            PluginManager.initialize(pluginLoader);
            let stub = Sinon.stub(pluginLoader, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });

            PluginManager.loadPlugin(plugin)
            .then(() => {
                console.log('shouldnt call this method');
            })
            .catch(() => {
                Sinon.assert.calledWith(stub, plugin);
                stub.restore();
                done();
            });
        });
    });
})