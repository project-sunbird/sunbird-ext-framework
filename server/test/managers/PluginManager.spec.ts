import * as chai from 'chai';
import * as Sinon from 'sinon';
import 'mocha';
import { PluginManager } from '../../src/managers/PluginManager';
import { FrameworkConfig } from '../../src/interfaces';
import { PluginLoader } from '../../src/managers/PluginLoader';
import { FrameworkError, FrameworkErrors } from '../../src/util';
//TODO: remove all relative path reference with module alias path

chai.should();

var testConfig: FrameworkConfig = {
    db: {
       cassandra: {
           contactPoints: ['127.0.0.1'],
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
    let pluginManager: PluginManager;
    let pluginLoader: PluginLoader;
    before(() => {
        pluginLoader = new PluginLoader(testConfig);
        pluginManager = new PluginManager(pluginLoader)
    })
    
    describe('load method', () => {
        it('should call loadPlugin when plugins are given', (done) => {
            let stub = Sinon.stub(pluginManager, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
            pluginManager.load(testConfig).then(() => {
                Sinon.assert.calledTwice(stub);
                stub.restore();
                done()
            }).catch(() => {
                stub.restore();
            });
        })

        it('should not call loadPlugin when plugins are not specified', (done) => {
            let stub = Sinon.stub(pluginManager, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
            let config = {...testConfig};
            config.plugins = [];
            pluginManager.load(config).then(() => {
                Sinon.assert.notCalled(stub);
                stub.restore();
                done()
            }).catch(() => {
                stub.restore();
            });;
        })
    })

    describe('getPluginInstance method', () => {
        it('should return plugin instance of plugin id', () => {
            let spyFn = Sinon.spy(pluginLoader, 'getPluginInstance');
            pluginManager.getPluginInstance('test-plugin');
            Sinon.assert.calledWith(spyFn, 'test-plugin')
        })
    })

    describe('loadPlugin method', () => {
        it('should call PluginLoader.loadPlugin method', (done) => {
            let plugin = {id: 'test-plugin', ver: '1.0'};
            let stub = Sinon.stub(pluginLoader, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });

            pluginManager.loadPlugin(plugin).then(() => {
                Sinon.assert.calledWith(stub, plugin);
                stub.restore();
                done();
            }).catch(() => {
                stub.restore();
            });
        });

        it('should throw error when PluginLoader.loadPlugin method throws error!', (done) => {
            let plugin = {id: 'test-plugin', ver: '1.0'};
            let stub = Sinon.stub(pluginLoader, "loadPlugin").callsFake(() => {
                return new Promise((resolve, reject) => {
                    reject(new FrameworkError({ code: FrameworkErrors.PLUGIN_LOAD_FAILED, rootError: new Error(), message: 'plugin load failed!' }));
                });
            });

            pluginManager.loadPlugin(plugin)
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