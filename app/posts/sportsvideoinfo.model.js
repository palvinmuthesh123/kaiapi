const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sports_id: { type: String, required: true },
    season_id: { type: String, required: true },
    title: { type: String, required: true },
    video: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SportsVideoInfo', schema);