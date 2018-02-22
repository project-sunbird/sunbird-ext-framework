export class CassandraQueryBuilder {

    public createTable(tableData: any) {
        let columns = "", queryString = "", primaryKeys = "", keyspace = "";

        tableData.fields.forEach((field) => {
            columns += `${field.key} ${field.type},`;
        })

        if(tableData.keyspace) keyspace = tableData.keyspace + ".";
    
        if(tableData.primary_key) {
            primaryKeys = tableData.primary_key.reduce((acc, curr) => { return acc = acc + ',' + curr});
            primaryKeys = 'PRIMARY KEY (' + primaryKeys + ')';
        }

        queryString = `CREATE TABLE ${keyspace}${tableData.name} ( ${columns} ${primaryKeys} )`
        console.log('creating table =====> ', queryString);
        return queryString
    }
}