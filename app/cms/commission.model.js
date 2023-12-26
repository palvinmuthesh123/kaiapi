const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    value: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Commission', schema);