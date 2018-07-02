import * as chai from 'chai'
import * as Sinon from 'sinon'
import 'mocha'
import { PluginRegistry } from '../../src/managers/PluginRegistry'
import { FrameworkConfig, PluginStatusEnum } from '../../src/interfaces'
import { CassandraMetaDataProvider } from '../../src/meta/CassandraMetaDataProvider'
import { CassandraDB } from "../../src/db/index"
import { defaultConfig } from '../../src/config'
import { Manifest, IPluginManifest } from '../../src/models/Manifest'
import { FrameworkError, FrameworkErrors } from '../../src/util';
//TODO: remove all relative path reference with module alias path

chai.should()

let cassandraInstance = new CassandraDB(defaultConfig.db.cassandra)
let metaDataProvider = new CassandraMetaDataProvider(cassandraInstance)

describe('Class PluginRegistry', () => {
    before(() => {
        PluginRegistry.initialize(metaDataProvider)
    })

    describe('register method', () => {
        it('should register the plugin with manifest', (done) => {
            let isRegisteredStub = Sinon.stub(PluginRegistry, 'isRegistered').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(false);
                })  
            })

            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'createMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(true);
                })  
            })
            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>', server: {} };
            PluginRegistry.register(Manifest.fromJSON(manifest)).then(() => {
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.calledOnce(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            }).catch(() => {
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
            })
        })

        it('should not register the plugin, if it is already registered', (done) => {
            let isRegisteredStub = Sinon.stub(PluginRegistry, 'isRegistered').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(true);
                })  
            })

            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'createMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(true);
                })  
            })
            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>', server: {} };
            PluginRegistry.register(Manifest.fromJSON(manifest)).then((registered) => {
                // tslint:disable-next-line:no-unused-expression
                registered.should.be.true;
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.notCalled(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            }).catch(() => {
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
            })
        })

        it('should handle error when metaDataProvider throws error', (done) => {
            let isRegisteredStub = Sinon.stub(PluginRegistry, 'isRegistered').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(false);
                })  
            })

            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'createMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    reject();
                })  
            })

            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>', server: {} };
            PluginRegistry.register(Manifest.fromJSON(manifest)).catch((error: FrameworkError) => {
                //TODO: assert error from metaDataProvider
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.calledOnce(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            }).catch(() => {
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
            })
        })
    })

    describe('unregister method', () => {
        let updateStatusStub = Sinon.stub(PluginRegistry, 'updateStatus').callsFake(() => {
            return new Promise((resolve, reject) => {
                resolve(true);
            })
        });
        it('should update the status of the plugin to UNREGISTER', (done) => {
            let pluginId = 'testPlugin1';
            PluginRegistry.unregister(pluginId).then(() => {
                Sinon.assert.calledWith(updateStatusStub, pluginId ,PluginStatusEnum.unregistered);
                updateStatusStub.restore();
                done();
            }).catch(() => {
                updateStatusStub.restore();
            })
        })
    })

    describe('isRegistered method', () => {
        it('should return TRUE, if the plugin is registered',(done) => {
            let pluginId = 'testPlugin123';
            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: [{ id: pluginId, status: PluginStatusEnum.registered }]});
                })  
            })

            PluginRegistry.isRegistered(pluginId).then((result) => {
                // tslint:disable-next-line:no-unused-expression
                result.should.be.true;
                metaDataProviderStub.restore();
                done();
            }).catch(() => {
                metaDataProviderStub.restore();  
                done();
            })
        })

        it('should return FALSE, if the plugin is registered', (done) => {
            let pluginId = 'testPlugin123';
            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: []});
                })  
            })

            PluginRegistry.isRegistered(pluginId).then((result) => {
              // tslint:disable-next-line:no-unused-expression
                result.should.be.false;
                metaDataProviderStub.restore();
                done();
            }).catch(() => {
                metaDataProviderStub.restore();
                done();
            })
        })
    })

    describe('getStatus method', () => {
        it('should return status, if plugin is registered', (done) => {
            let pluginId = 'testPlugin123';
            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: [{ id: pluginId, status: PluginStatusEnum.resolved }]});
                })  
            })

            PluginRegistry.getStatus(pluginId).then((status) => {
                status.should.be.equal(PluginStatusEnum.resolved);
                metaDataProviderStub.restore()
                done()
            }).catch(() => {
                metaDataProviderStub.restore()
            })
        })

        it('should return undefined, if plugin is not registered', (done) => {
            let pluginId = 'testPlugin123';
            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: [] });
                })  
            })

            PluginRegistry.getStatus(pluginId).then((status) => {
              // tslint:disable-next-line:no-unused-expression
                (status === undefined).should.be.true
                metaDataProviderStub.restore()
                done()
            }).catch(() => {
                metaDataProviderStub.restore()
                done();
            })
        })
    })

    describe('updateStatus method', () => {
        it('should update the status of the plugin', (done) => {
            let pluginId = 'testPlugin123';
            let plugin = { id: pluginId, status: PluginStatusEnum.resolved };
            let metaDataGetMetaStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: [plugin]});
                })  
            });
            let metaDataUpdateMetaStub = Sinon.stub(metaDataProvider, 'updateMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve(true);
                });  
            });
            PluginRegistry.updateStatus(pluginId, PluginStatusEnum.stopped).then((status) => {
                status.should.be.equal(PluginStatusEnum.stopped);
                plugin.status.should.be.equals(PluginStatusEnum.stopped);
                metaDataUpdateMetaStub.restore();
                Sinon.assert.calledOnce(metaDataUpdateMetaStub);
                metaDataGetMetaStub.restore();
                done()
            }).catch(() => {
                metaDataGetMetaStub.restore();
                metaDataUpdateMetaStub.restore();
                done();
            })
        })
    })
})
