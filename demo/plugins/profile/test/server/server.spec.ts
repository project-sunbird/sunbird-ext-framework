import {TestFramework, Framework, FrameworkConfig} from 'ext-framework-server';
import 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import chaiHttp from 'chai-http';

chai.use(require('chai-http'));
chai.should();

const plugin = {id: 'profile-server', ver: '1.0'};
const baseURL = "http://127.0.0.1:9000";

describe('Profile server plugin', () => {
    before((done) => {
        let config: FrameworkConfig = { plugins: [plugin], pluginBasePath: path.join(__dirname, 'node_modules/') }
        TestFramework.initialize(config).then(() => {
            done();
        })
    })

    describe('getUser method', () => {
        it('should return 200 response when request is valid!', (done) => {
            chai.request(baseURL)
            .get('/profile/user/v1/read/123')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.deep.equal({
                    avatar: "https://sunbirddev.blob.core.windows.net/user/874ed8a5-782e-4f6c-8f36-e0288455901e/File-01242833565242982418.png",
                    firstName: "John",
                    lastName: "Doe",
                    department: "Science",
                    hireDate:"2010-08-04",
                    dob: "1978-03-04",
                    gender: "Male",
                    email: "john.doe@test.com",
                    phone: "9876543210"
                });
                done();
            })
        });

        it('should return 400 response when request is invalid!', (done) => {
            chai.request(baseURL)
            .get('/profile/user/v1/read/asdf')
            .end((err, res) => {
                //res.should.have.status(400);
                //res.body.should.be.empty;
                done();
            })
        });
    });

    describe('setUser method', () => {
        it('should send 200 response when request is valid!', (done) => {
            chai.request(baseURL)
            .post('/profile/user/v1/add')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })
});




