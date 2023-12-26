const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    prize: { type: String, required: true },
    coupon: { type: String, required: true},
    expiry: { type: String, required: true},
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Games', schema);