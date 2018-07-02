Object.defineProperty(exports, "__esModule", { value: true });

class Server {
    constructor(manifest) {
        this.manifest = null;
        this.manifest = manifest;
    }
    getUser(req, res) {
        res.send({ status: 'success' }).status(200);
    }
    getAllUser(req, res) {
        res.send({ status: "success" }).status(200);
    }
}
exports.Server = Server;
