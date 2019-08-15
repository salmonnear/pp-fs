const mongoose = require('mongoose');

const factorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    upperBound: Number,
    lowerBound: Number,
    childNodes: [Number],
    numberOfNodes: Number
});

module.exports = mongoose.model('Factory', factorySchema);