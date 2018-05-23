export class CassandraQueryBuilder {

    public createTable(schemaData: any, table: any, keyspace: string = "") {
        let columns = ""
        let primaryKeys = "";

        table.fields.forEach((field) => {
            columns += `${field.key} ${field.type},`;
        })

        if(keyspace !== "") keyspace += ".";
    
        if(table.primary_key) {
            primaryKeys = table.primary_key.reduce((acc, curr) => { return acc = acc + ',' + curr});
            primaryKeys = 'PRIMARY KEY (' + primaryKeys + ')';
        }

        return `CREATE TABLE IF NOT EXISTS ${keyspace}${table.name} ( ${columns} ${primaryKeys} )`
    }
}