const mongoose = require('mongoose');

const pointScheme = new mongoose.Schema({
    description: String,
    location: {
        coordinates: {
            type: [Number],//[ longitude , latitude ]
            required: true// -180 =< longitude(x) <= 180 -90 =< latitude(y) <= 90
        }
    }
});

pointScheme.index({'location.coordinates': '2d'});

const Point = mongoose.model('Point', pointScheme);

module.exports = Point;
