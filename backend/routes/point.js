const express = require('express');
const router = express.Router();
const {savePoint, updatePoint, deletePoint, getNeighbours, getPoints} = require('../workers/storage');

const coordinatesChecking = {
    x: x => x >= -180 && x <= 180,
    y: y => y >= -90 && y <= 90
};

const isPositive = p => p >= 0;

router.get('/neighbours', checkParameters('query', {
        ...coordinatesChecking,
        m: isPositive,
        n: isPositive
    }),
    basicHandler(req => {console.log('neighbours');
        const m = req.query.m;//m - radius in km
        const n = Number.parseInt(req.query.n);//max neighbours count
        const x = req.query.x;
        const y = req.query.y;
        return getNeighbours(m, n,{x, y});
    }));

router.get('/', checkParameters('query', {
        page: isPositive,
        count: isPositive
    }),
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
router.post('/', checkParameters('body', {
        ...coordinatesChecking,
        description: null,
    }),
    basicHandler( req => {
        console.log('add');
        const x = req.body.x;
        const description = req.body.description;
        const y = req.body.y;
        return savePoint(x, y, description)
    }));
/**
 * Edit existing point
 * @param id - entity identifier
 * New attributes:
 * @param x - should be in [-180; 180]
 * @param y - should be in [-90; 90]
 * @param info - entity description
 */
router.put('/', checkParameters('body', {
        ...coordinatesChecking,
        description: null,
        id: null
    }),
    basicHandler(req => {
        const x = req.body.x;
        const y = req.body.y;
        const description = req.body.description;
        //console.log('put: ' + req.body.id);
        return updatePoint({id: req.body.id, x, y, description})
    }));

router.delete('/:id', checkParameters('params', {['id']: null}),
    basicHandler(req =>
        deletePoint(req.params.id)));

function basicHandler(handler) {
    return (req, res) => handler(req, res)
        .then(result =>
            res.send(result))
        .catch(error => {
                res.statusCode = 500;
                res.send({error});
        });
}

const defaultParamCheckFunc = v => true;

function checkParameters(parameterPlace, params) {
    return (req, res, next) => {
        console.log(req.body)
        for (let param of Object.keys(params)) {
            const paramValue = req[parameterPlace][param];
            let paramCheckFunc = params[param];
            if(!paramCheckFunc) paramCheckFunc = defaultParamCheckFunc;
            if (paramValue === undefined || paramValue === null) {
                res.statusCode = 400;
                res.send({error: `Parameter ${param} is missed`});
                return;
            } else if (!paramCheckFunc(paramValue)) {
                res.statusCode = 400;
                res.send({error: `Incorrect value of parameter ${param}`});
                return;
            }
        }
        next();
    };
}

module.exports = router;
