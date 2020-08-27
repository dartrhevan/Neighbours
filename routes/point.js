const express = require('express');
const router = express.Router();
const {savePoint, updatePoint, deletePoint, getNeighbours, getPoints} = require('../workers/storage');

router.get('/neighbours',
    basicHandler(req => {console.log('neighbours');
        const m = req.query.m;//m - radius in km
        const x = req.query.x;
        const y = req.query.y;
        return getNeighbours(m, {x, y});
    }));

router.get('/',
    basicHandler( req => {
        const count = req.query.count;
        const page = req.query.page;
        return getPoints(count, page);
    }));

router.post('/',
    basicHandler( req => {
        console.log('add');
        const x = req.body.x;
        const description = req.body.info;
        const y = req.body.y;
        return savePoint(x, y, description)
    }));

router.put('/',
    basicHandler(req => {
        const x = req.body.x;
        const y = req.body.y;
        const description = req.body.info;
        console.log('put');
        return updatePoint({id: req.body.id, x, y, description})
    }));

router.delete('/:id',
    basicHandler(req => {
        const id = req.params.id;
        return deletePoint(id);
    }));

function basicHandler(handler) {
    return (req, res) => handler(req, res)
        .then(result => res.send(result))
        .catch(error => {
            if(error && error.length > 0) {
                res.statusCode = 500;
                res.send({error});
            }
        });
}

module.exports = router;
