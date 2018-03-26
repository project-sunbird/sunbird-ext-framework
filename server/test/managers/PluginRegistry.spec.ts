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

    describe('.register method', () => {
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
            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>' };
            PluginRegistry.register(Manifest.fromJSON(manifest)).then(() => {
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.calledOnce(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            })
        })

        xit('should not register the plugin and throw error if it is already registered', (done) => {
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
            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>' };
            PluginRegistry.register(Manifest.fromJSON(manifest)).catch((error: FrameworkError) => {
                error.code.should.be.equal(FrameworkErrors.PLUGIN_REGISTERED)
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.notCalled(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            })
        })

        xit('should handle error when metaDataProvider throws error', (done) => {
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

            let manifest: IPluginManifest = { id: 'test-plugin', name: 'Test Plugin', version: '1.0.0', author: 'sunil A S <sunils@ilimi.in>' };
            PluginRegistry.register(Manifest.fromJSON(manifest)).catch((error: FrameworkError) => {
                //TODO: assert error from metaDataProvider
                Sinon.assert.calledOnce(isRegisteredStub);
                Sinon.assert.calledOnce(metaDataProviderStub);
                isRegisteredStub.restore();
                metaDataProviderStub.restore();
                done()
            })
        })
    })

    describe('.unregister method', () => {
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
            })
        })
    })

    describe('.isRegistered method', () => {
        it('should return TRUE, if the plugin is registered',(done) => {
            let pluginId = 'testPlugin123';
            let metaDataProviderStub = Sinon.stub(metaDataProvider, 'getMeta').callsFake(() => {
                return new Promise((resolve, reject) => {
                    resolve({ rows: [{ id: pluginId, status: PluginStatusEnum.registered }]});
                })  
            })

            PluginRegistry.isRegistered(pluginId).then((result) => {
                result.should.be.true;
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
                result.should.be.false;
                metaDataProviderStub.restore();
                done();
            })
        })
    })

    describe('.getStatus method', () => {
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
                (status === undefined).should.be.true
                metaDataProviderStub.restore()
                done()
            })
        })
    })

    describe('.updateStatus method', () => {
        it('should update the status of the plugin', () => {
            
        })
    })
})
