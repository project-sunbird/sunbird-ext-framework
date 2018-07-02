Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = {
    "id": "test-plugin-with-dependencies",
    "name": "sunbird test plugin",
    "author": "sunil<sunils@ilimi.in>",
    "version": "1.0",
    "server": {
        "routes": {
            "prefix": "/profile/10"
        },
        "databases": [{
                "type": "cassandra",
                "path": "db/cassandra",
                "compatibility": "~1.0"
            },
            {
                "type": "es",
                "path": "db/es",
                "compatibility": "~1.0"
            }
        ],
        "dependencies": [{ id: 'dependent-plugin', ver: '1.0'}]
    }
};
