const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: false },
    role: { type: String, required: false },
    avatar: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now },
    active: {type: Boolean, default: true},
    admin: {type: Boolean, default: false},
    age: { type: String, default: '' },
    bio: { type: String, default: '' },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    description: { type: String, default: '' },
    deviceid: { type: String, default: '' },
    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    country: { type: String, default: '' },
    sports: { type: String, default: '' },
    level: { type: String, default: '' },
    school_name: { type: String, default: '' },
    school_location: { type: String, default: '' },
    experience: { type: String, default: '' },
    studied_school: { type: String, default: '' },
    studied_degree: { type: String, default: '' },
    studied_start_year: { type: String, default: '' },
    studied_end_year: { type: String, default: '' },
    coach_level: { type: String, default: '' },
    coach_sports: { type: String, default: '' },
    coach_school_name: { type: String, default: '' },
    coach_experience: { type: String, default: '' },
    coach_description: { type: String, default: '' },
    position: { type: String, default: '' },
    city: { type: String, default: '' }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);