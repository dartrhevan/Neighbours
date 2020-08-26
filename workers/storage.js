const Point = require('./Point');

function savePoint(x, y, description) {//point = {x, y, info}
    console.log(description);
    const point = new Point({description, location: {/*type: "Point",*/ coordinates: [x, y]}});
    return new Promise(((resolve, reject) => point.save((error, result) => {
        console.log(error)
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
    console.log(point.description);
    //TODO: updating
    return new Promise((resolve, reject) =>
        Point.findByIdAndUpdate(point.id,{description: point.description, location: {type: "Point", coordinates: [point.x, point.y]}},
        (error, result) => {
            console.log(error);
            if(error)
                reject(error);
            else
                resolve(result);
        }));
}

function deletePoint(id) {
    //TODO: deleting
    return new Promise((resolve, reject) => Point.findByIdAndRemove(id,(error, result) => {
        console.log(error);
        if(error)
            reject(error);
        else
            resolve(result);
    }));
}

function getNeighbours(m, point) {
    console.log(point);
    return new Promise((resolve, reject) => Point.find(   {
        location:
            { $near :
                    {
                        $geometry: { type: "Point",  coordinates: [ point.x, point.y ] },
                        //$minDistance: 1000,
                        $maxDistance: m * 1000
                    }
            }
    }, (error, result) => {
        console.log(error);
        if(error)
            reject(error);
        else
            resolve(result);
    }));
}

module.exports = {getNeighbours, updatePoint, deletePoint, getPoints, savePoint};
