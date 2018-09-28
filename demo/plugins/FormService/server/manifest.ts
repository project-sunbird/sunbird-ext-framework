export const manifest = {
    "id": "@project-sunbird/form-service",
    "name": "Form service",
    "author": "sunil<sunils@ilimi.in>",
    "version": "1.0",
    "server": {
        "routes": {
            "prefix": "/v1/form"
        },
        // check whether this is required or not
        "databases": [{
                "type": "cassandra",
                "path": "db/cassandra",
                "compatibility": "~1.0"
            }
        ],
        "dependencies": []
    }
}