const Point = require('./Point');

const dbResultCallBack = (error, result, resolve, reject) => {
    console.log(error);
    if(error)
        reject(error);
    else
        resolve(result);
};

const dbResultLessCallBack = (error, resolve, reject) => {
    console.log(error);
    if(error)
        reject(error);
    else
        resolve({});
};

function savePoint(x, y, description) {//point = {x, y, info}
    console.log(description);
    const point = new Point({description, location: { coordinates: [x, y] }});
    return new Promise(((resolve, reject) => point.save((e, r) => dbResultLessCallBack(e, r, resolve, reject))));
}

function getPoints(pageSize, page) {
    return new Promise((resolve, reject) =>  Point.find({}, (e, r) => dbResultCallBack(e, r, resolve, reject))
        .skip(pageSize * page)
        .limit(pageSize));
}

function updatePoint(point) {
    console.log(point.description);
    return new Promise((resolve, reject) =>
        Point.findByIdAndUpdate(point.id,{description: point.description,
                location: {type: "Point", coordinates: [point.x, point.y]}}, (e, r) => dbResultLessCallBack(e, r, resolve, reject)));
}

function deletePoint(id) {
    return new Promise((resolve, reject) =>
        Point.findByIdAndRemove(id, (e, r) => dbResultLessCallBack(e, r, resolve, reject)));
}

function getNeighbours(m, point) {
    console.log(point);
    return new Promise((resolve, reject) => Point.find({
        location:
            { $near :
                    {
                        $geometry: { type: "Point",  coordinates: [ point.x, point.y ] },
                        //$minDistance: 1000,
                        $maxDistance: m * 1000
                    }
            }
    }, (e, r) => dbResultCallBack(e, r, resolve, reject)));
}

module.exports = {getNeighbours, updatePoint, deletePoint, getPoints, savePoint};
