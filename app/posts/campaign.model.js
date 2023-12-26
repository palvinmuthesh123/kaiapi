const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    venue: { type: String, required: true },
    host_name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    eligible_sports: { type: String },
    about: { type: String },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Campaign', schema);