const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    active: {type: Boolean, default: true},
    approved: {type: Boolean, default: ''},
    admin: {type: Boolean, default: false},
    country: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    reg_no:  { type: String, required: true },
    patients: { type: String },
    rating:  { type: String },
    about: { type: String },
    working_time:  { type: String },
    certificate: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Doctors', schema);