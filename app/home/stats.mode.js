const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId      :   { type: String, required: true},
    friends     :   { type: Number, required: true, default: 0 },
    skips       :   { type: Number, required: true, default: 0 },
    calories    :   { type: Number, required: true, default: 0 },
    distanceRan :   { type: Number, required: true, default: 0 },
    skipDistance:   { type: Number, required: true, default: 0 },
    createdDate :   { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Stats', schema);