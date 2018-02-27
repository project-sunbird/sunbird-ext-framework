import { IMetaDataProvider,PluginMeta } from "../interfaces";

export class CassandraMetaDataProvider implements IMetaDataProvider {
    getMeta(id: string) {

    }

    updateMeta(id: string, meta: PluginMeta) {

    }

    createMeta(meta: PluginMeta) {

    }

    deleteMeta(id: string) {

    }

}

export const cassandraMetaDataProvider = new CassandraMetaDataProvider();