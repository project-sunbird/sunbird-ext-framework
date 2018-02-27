import { IMetaDataProvider, PluginMeta, ICassandraConfig } from "../interfaces";
import { CassandraSchemaLoader } from '../db/cassandra/CassandraSchemaLoader';
import { CassandraDB } from "../db/index";
import { defaultConfig } from "../config";
import { Util } from "../util/index";

export class CassandraMetaDataProvider implements IMetaDataProvider {
    private connection: any;

    constructor(db: CassandraDB) {
        this.connection = db.getConnection();
    }

    public async getMeta(id: string) {
        let result = await this.connection.execute(`SELECT * FROM REGISTRY WHERE id=?`, [id]);
        if (result.rowLength > 0) return result;
        else return;
    }

    public async updateMeta(id: string, meta: PluginMeta) {
        let params = [meta.name, meta.uuid, meta.version, meta.repo, meta.status, new Date(), meta.cassandra_keyspace, meta.elasticsearch_index, meta.manifest];
        return await this.connection.execute(`UPDATE registry SET name = ?, uuid = ?, version = ?, repo = ?, status = ?, registered_on = ?, cassandra_keyspace = ?,
            elasticsearch_index = ?, manifest = ? WHERE id = ?`, [...params, meta.id]);
    }

    public async createMeta(meta: PluginMeta) {
        let params = [meta.id, meta.name, meta.uuid, meta.version, meta.repo, meta.status, meta.registered_on, meta.cassandra_keyspace, meta.elasticsearch_index, meta.manifest];
        return await this.connection.execute(`INSERT INTO REGISTRY (id, name, uuid, version, repo, status, registered_on, cassandra_keyspace,
            elasticsearch_index, manifest) VALUES (?,?,?,?,?,?,?,?,?,?)`, params, { prepare: true })
    }

    public async deleteMeta(id: string) {
        return await this.connection.execute(`DELETE FROM registry where id = ?`, id);
    }

}


let cassandraConfig: ICassandraConfig = {
    contactPoints: defaultConfig.db.cassandra.contactPoints,
    keyspace: Util.generateId(defaultConfig.db.cassandra.keyspace, defaultConfig.db.cassandra.keyspace)
}

let cassandraInstance = new CassandraDB(cassandraConfig)
export const cassandraMetaDataProvider = new CassandraMetaDataProvider(cassandraInstance);