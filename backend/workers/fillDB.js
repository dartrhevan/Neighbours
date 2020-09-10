const Point = require('../workers/Point');

let j = 0;

async function fillPart() {
    if (j++ === 4) return;
    for(let i = 0; i < 2.8e6; i++) {
        const newPoint = generatePoint(i);
        if (!(i % 500))
            console.log("p" + i);
        await newPoint.save();
    }
}

function generateLatitude() {
    return Math.random() * 360 - 180;
}

function generatePoint(i) {
    return new Point({
        "description": "p3." + i,
        "location": { "coordinates": [ generateLatitude(), generateLongitude() ] }
    });
}

function generateLongitude() {
    return Math.random() * 180 - 90;
}

fillPart();
