const request = require("supertest");
const assert = require("assert");
require('./setupTests');

const app = require("../app");

it("should return Hello Test", done => {
    request(app)
        .get("/api/point/neighbours")
        .expect(response => {
            //assert.deepEqual(response.body, {name:"Tom", age:22});
        })
        .end(done);
});
