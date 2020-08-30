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

router.get('/', checkParameters('query', 'page', 'count'),
    basicHandler( req => {
        const count = Number.parseInt(req.query.count);
        const page = Number.parseInt(req.query.page);
        return getPoints(count, page);
    }));
/**
 * Create new point with following attributes
 * @param x
 * @param y
 * @param info - entity description
 */
router.post('/', checkParameters('body', 'x', 'y', 'info'),
    basicHandler( req => {
        console.log('add');
        const x = req.body.x;
        const description = req.body.info;
        const y = req.body.y;
        return savePoint(x, y, description)
    }));
/**
 * Edit existing point
 * @param id - entity identifier
 * New attributes:
 * @param x
 * @param y
 * @param info - entity description
 */
router.put('/', checkParameters('body', 'x', 'y', 'info', 'id'),
    basicHandler(req => {
        const x = req.body.x;
        const y = req.body.y;
        const description = req.body.info;
        console.log('put');
        return updatePoint({id: req.body.id, x, y, description})
    }));

router.delete('/:id', checkParameters('params', 'id'),
    basicHandler(req =>
        deletePoint(req.params.id)));

function basicHandler(handler) {
    return (req, res) => handler(req, res)
        .then(result =>
            res.send(result))
        .catch(error => {
            //if(error && error.length > 0) {
                res.statusCode = 500;
                res.send({error});
            //}
        });
}

function checkParameters(parameterPlace, ...params) {
    return (req, res, next) => {
        for (let param of params)
            if(!req[parameterPlace][param]) {
                res.statusCode = 400;
                res.send({error: `Parameter ${param} is missed`});
                return;
            }
        next();
    };
}

module.exports = router;
