const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true }, 
    name: { type: String, required: true },
    class: { type: String, required: true },
    position: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AthleteJob', schema);