Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class Router {
    init(app, manifest, auth) {
        const server = new server_1.Server(manifest);
        app.get('/user/v1/readAll', (req, res) => { server.getAllUser(req, res); });
        app.get('/user/v1/read/:id', (req, res) => { server.getUser(req, res); });
    }
}
exports.Router = Router;
