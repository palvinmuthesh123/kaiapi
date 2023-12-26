const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    time: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    last_visit: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    symptoms: { type: String, required: true },
    fees: { type: String, required: true },
    report: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    reports: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Patient', schema);