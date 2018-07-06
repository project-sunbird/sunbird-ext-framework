export class Server {
  public sayHello(req, res, next) {
    res.status(200)
    .send('Hello world')
  }
}