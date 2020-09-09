const mongoose = require('mongoose');

const pointScheme = new mongoose.Schema({
    description: String,
    location: {
        /*type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            default: "Point",
            required: true,
            //index: '2dsphere'
        },*/
        coordinates: {
            type: [Number],//[ longitude , latitude ]
            required: true// -180 =< longitude(x) <= 180 -90 =< latitude(y) <= 90
        }
    }
});

pointScheme.index({'location.coordinates': '2d'});

const Point = mongoose.model('Point', pointScheme);

module.exports = Point;
