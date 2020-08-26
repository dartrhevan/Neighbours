const express = require('express');
const router = express.Router();
const {savePoint, updatePoint, deletePoint, getNeighbours, getPoints} = require('../workers/storage');

router.get('/neighbours', function(req, res, next) {
    const m = req.query.m;//m - radius in km
    const x = req.query.x;
    const y = req.query.y;
    //res.send(JSON.stringify(getNeighbours(m, {x, y})));
    getNeighbours(m, {x, y})
        .then(result => {
        /*if(error && error.length > 0) {
            res.statusCode = 500;
            res.send({error});
        }
        else*/ res.send(result);
    }).catch(error => {
        if(error && error.length > 0) {
            res.statusCode = 500;
        }
        res.send({error});
    });
});

router.get('/', function(req, res, next) {
    const count = req.query.count;
    const page = req.query.page;
    getPoints(count, page)
        .then(result => {
        /*if(error && error.length > 0) {
            res.statusCode = 500;
            res.send({error});
        }
        else*/ res.send(result);
    }).catch(error => {
        if(error && error.length > 0) {
            res.statusCode = 500;
            res.send({error});
        }
    });
});

router.post('/', function(req, res, next) {
    const x = req.body.x;
    const description = req.body.info;
    const y = req.body.y;
    savePoint(x, y, description)
        .then(result => {
            /*if(error && error.length > 0) {
                res.statusCode = 500;
                res.send({error});
            }
            else*/ res.send(result);
        }).catch(error => {
        if(error && error.length > 0) {
            res.statusCode = 500;
            res.send({error});
        }
    });
});

router.put('/', function(req, res, next) {
    const x = req.body.x;
    const y = req.body.y;
    res.send(JSON.stringify(updatePoint({x, y})));
});

router.delete('/', function(req, res, next) {
    const x = req.query.x;
    const y = req.query.y;
    res.send(JSON.stringify(deletePoint({x, y})));
});

module.exports = router;
