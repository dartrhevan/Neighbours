const mongoose = require('mongoose');

const Point = mongoose.model('Point', new mongoose.Schema({
    description: String,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number],//[ longitude , latitude ]
            required: true// -180 =< longitude <= 180 -90 =< latitude <= 90
        },
        //index: '2dsphere',
    }
}));

mongoose.connect('mongodb://localhost:27017/example');

module.exports = Point;
