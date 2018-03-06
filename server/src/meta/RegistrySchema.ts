export const RegistrySchema = {
    "db": "core_framework_schema",
    "type": "cassandra",
    "dbConfig": {},
    "tables": [{
        "name": "registry",
        "fields": [{
                "key": "id",
                "type": "text"
            },
            {
                "key": "name",
                "type": "text"
            },
            {
                "key": "uuid",
                "type": "text"
            },
            {
                "key": "version",
                "type": "text"
            },
            {
                "key": "repo",
                "type": "text"
            },
            {
                "key": "status",
                "type": "int"
            },
            {
                "key": "registered_on",
                "type": "date"
            },
            {
                "key": "cassandra_keyspace",
                "type": "text"
            },
            {
                "key": "elasticsearch_index",
                "type": "text"
            },
            {
                "key": "manifest",
                "type": "text"
            }
        ],
        "primary_key": ["id"]
    }]
}