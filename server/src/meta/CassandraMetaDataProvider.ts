import { IMetaDataProvider, PluginMeta, ICassandraConfig } from "../interfaces";
import { CassandraDB } from "../db";
import { defaultConfig } from "../config";
import { Util, delayPromise, FrameworkError, FrameworkErrors } from "../util";
import { RegistrySchema } from "./RegistrySchema";

export class CassandraMetaDataProvider implements IMetaDataProvider {
    private connection: any;
    private cassandraDB: CassandraDB;

    constructor(cassandraDB: CassandraDB) {
        this.cassandraDB = cassandraDB;
    }

    private async getConnection(): Promise<any> {
        if (this.connection) return this.connection;
        this.connection = this.cassandraDB.getConnection(defaultConfig.db.cassandra);
        let keyspaceName = Util.generateId(RegistrySchema.db, RegistrySchema.db);
        await this.createKeyspace(keyspaceName, defaultConfig.db.cassandra.defaultKeyspaceSettings)
        return this.connection = this.cassandraDB.getConnectionByKeyspace(keyspaceName);
    }

    private async createKeyspace(name: string, defaultSettings: ICassandraConfig["defaultKeyspaceSettings"]) {
        return await this.connection.connect()
            .then(() => {
                const query = `CREATE KEYSPACE IF NOT EXISTS ${name} WITH replication = ` + JSON.stringify(defaultSettings.replication).split("\"").join("'");
                this.connection.execute(query);
            })
            .then(delayPromise(100))
            .catch((err) => {
                throw new FrameworkError({ code: FrameworkErrors.DB_ERROR, rootError: err })
            })
    }

    public async getMeta(id: string) {
        let connection = await this.getConnection()
        let result = await connection.execute(`SELECT * FROM REGISTRY WHERE id=?`, [id]);
        if (result.rowLength > 0) return result;
        else return;
    }

    public async updateMeta(id: string, meta: PluginMeta) {
        let connection = await this.getConnection()
        let params = [meta.name, meta.uuid, meta.version, meta.repo, meta.status, new Date(), meta.cassandra_keyspace, meta.elasticsearch_index, meta.manifest];
        return await connection.execute(`UPDATE registry SET name = ?, uuid = ?, version = ?, repo = ?, status = ?, registered_on = ?, cassandra_keyspace = ?,
            elasticsearch_index = ?, manifest = ? WHERE id = ?`, [...params, meta.id]);
    }

    public async createMeta(meta: PluginMeta) {
        let connection = await this.getConnection()
        let params = [meta.id, meta.name, meta.uuid, meta.version, meta.repo, meta.status, meta.registered_on, meta.cassandra_keyspace, meta.elasticsearch_index, meta.manifest];
        return await connection.execute(`INSERT INTO REGISTRY (id, name, uuid, version, repo, status, registered_on, cassandra_keyspace,
            elasticsearch_index, manifest) VALUES (?,?,?,?,?,?,?,?,?,?)`, params, { prepare: true })
    }

    public async deleteMeta(id: string) {
        let connection = await this.getConnection()
        return await connection.execute(`DELETE FROM registry where id = ?`, id);
    }

}


let cassandraConfig: ICassandraConfig = {
    contactPoints: defaultConfig.db.cassandra.contactPoints,
    keyspace: Util.generateId(defaultConfig.db.cassandra.keyspace, defaultConfig.db.cassandra.keyspace)
}
let cassandraInstance = new CassandraDB(cassandraConfig)
export const cassandraMetaDataProvider = new CassandraMetaDataProvider(cassandraInstance);