const Point = require('./Point');

function savePoint(x, y, description) {//point = {x, y, info}
    const point = new Point({description, location: {/*type: "Point",*/ coordinates: [x, y]}});
    return new Promise(((resolve, reject) => point.save((error, result) => {
        if(error)
            reject(error);
        else
            resolve(result);
    })));
}

function getPoints(pageSize, page) {
    return new Promise((resolve, reject) =>  Point.find({}, (error, result) => {
        if(error)
            reject(error);
        else
            resolve(result);
        })
        .skip(pageSize * page)
        .limit(pageSize));
}

function updatePoint(point) {
    //Point.findById(point, {})
    //TODO: updating
}

function deletePoint(point) {
    //TODO: deleting
}

function getNeighbours(m, point) {
    return new Promise((resolve, reject) => Point.find(   {
        location:
            { $near :
                    {
                        $geometry: { type: "Point",  coordinates: [ point.x, point.y ] },
                        //$minDistance: 1000,
                        $maxDistance: m * 1000
                    }
            }
    }), (error, result) => {
        if(error)
            reject(error);
        else
            resolve(result);
    });
}

module.exports = {getNeighbours, updatePoint, deletePoint, getPoints, savePoint};
