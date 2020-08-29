const request = require("supertest");
const assert = require("assert");
//const {describe, test, it} = require('@jest/globals');
const {Energetic, Irikla, Gay} = require('./setupTests');

const app = require("../app");

it("Get list tests", done => {
    request(app)
        .get("/api/point/")
        .expect(response => {
            const list = response.body;//JSON.parse(response.body);
            console.log(list);
            //it("Should return a list of points", () =>
                assert.ok(typeof list === typeof [], "Test");//);

            //it("List should contains predefined points", () => {
                assert.ok(list.contains(Energetic), "Contains Energetic");
                assert.ok(list.contains(Irikla), "Contains Irikla");
                assert.ok(list.contains(Gay), "Contains Gay");
            //});
        })
        .end(done);
});
