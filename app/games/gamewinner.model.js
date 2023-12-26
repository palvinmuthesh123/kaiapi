const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    gameid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    prize: { type: String, required: true },
    coupon: { type: String, required: true},
    expiry: { type: String, required: true},
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GameWinner', schema);