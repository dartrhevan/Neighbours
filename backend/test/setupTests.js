const mongoose = require('mongoose');
const Point = require('../workers/Point');

//mongoose.connect('mongodb://localhost:27017/example');

const Energetic = new Point({description: "Energetic", location: { coordinates: [51.741918, 58.796505] }});

const Irikla = new Point({description: "Irikla", location: { coordinates: [51.675254, 58.632518] }});//~20km

const Gay = new Point({description: "Gay", location: { coordinates: [51.462286, 58.436775] }});//<=60km

Energetic.save();
Irikla.save();
Gay.save();

module.exports = { Energetic, Irikla, Gay };
