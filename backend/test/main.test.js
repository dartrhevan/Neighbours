const request = require("supertest");
const assert = require("assert");
const {describe, afterAll, it} = require('@jest/globals');
const {Energetic, Irikla, Gay, RemovingPoint} = require('./setupTests');

const mongoose = require('mongoose');
const app = require("../app");

describe("Tests", () => {
    it("Get list tests", done => {
        request(app)
            .get("/api/point?page=0&count=100")
            .expect(200)
            .expect(response => {
                const list = response.body;//JSON.parse(response.body);
                console.log(list);
                assert.ok(typeof list === typeof [], "Response type is list");

                assert.notEqual(list.indexOf(Energetic), -1, "Contains Energetic");
                assert.notEqual(list.indexOf(Irikla), -1, "Contains Irikla");
                assert.notEqual(list.indexOf(Gay), -1, "Contains Gay");
                done();
            })
            .end(done);
    });

    it("Pagination tests", done => {
        request(app)
            .get("/api/point?count=2&page=0")
            .expect(200)
            .expect(response => {
                const list = response.body;//JSON.parse(response.body);
                console.log(list);
                assert.ok(typeof list === typeof [], "Response type is list");

                assert.equal(list.length, 2, "Correct points count");
                done();
            })
            .end(done);
    });

    it("Get neighbours tests", done => {
        request(app)
            .get(`/api/point/neighbours?m=30&x=51.741918&y=58.796505`)//Energetic's coordinates
            .expect(200)
            .expect(response => {
                const list = response.body;//JSON.parse(response.body);
                console.log(list);
                assert.notEqual(list.indexOf(Energetic), -1, "Contains Energetic");
                assert.notEqual(list.indexOf(Irikla), -1, "Contains Irikla");
                assert.equal(list.indexOf(Gay), -1, "Not contains Gay");
                done();
            })
            .end(done);
    });

    it("Add point tests", done => {
        const point = {description: "Yakub", location: {coordinates: [ 30, 30 ]}};
        request(app)
            .post('/api/point/')
            .send({x: 30, y: 30, info: "Yakub"})
            .set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) =>
                request(app)
                    .get("/api/point?page=0&count=100")
                    .expect(200)
                    .expect(response => {
                        const list = response.body;
                        console.log(list);
                        const index = list.indexOf(point);
                        assert.notEqual(index, -1, "Contains new point");
                        done();
                    })
                    .end(done)
            );
    });

    it("Remove Test", async done => {
        const id = RemovingPoint._id.toString();
        console.log(id);
        const resp = await request(app)
            .delete("/api/point/" + id)
            .expect(200);

        console.log("Checking");
        request(app)
            .get("/api/point?page=0&count=100")
            .expect(200)
            .expect(response => {
                const list = response.body;
                console.log(list);
                assert.equal(list.find(el => el._id === id), undefined, "Point removed");
                done();
            })
            .end(done);
    });

    it("Incorrect request test", done => {
        request(app)
            .post('/api/point/')
            .send({x: 30, info: "t"})
            .set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            .expect(400)
            .expect({error: "Parameter y is missed"})
            .end(done);
    });

    it("Neighbours test", async done => {
        request(app)
            .get("/api/point?page=0&count=100")
            .expect(200)
            .expect(response => {
                const list = response.body;//JSON.parse(response.body);
                console.log(list);
                assert.ok(typeof list === typeof [], "Test");

                assert.notEqual(list.indexOf(Energetic), -1, "Contains Energetic");
                assert.notEqual(list.indexOf(Irikla), -1, "Contains Irikla");
                assert.notEqual(list.indexOf(Gay), -1, "Contains Gay");
                done();
            })
            .end(done);
    });
});

afterAll(async () => {
    await mongoose.connection.close()
});
