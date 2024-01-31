const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true }, 
    name: { type: String, required: true },
    date: { type: String, required: true },
    email: { type: String, default:'' },
    phone: { type: String, default:'' },
    time: { type: String, required: true },
    type: { type: String, required: true },
    patient_name: { type: String, required: true },
    patient_age: { type: String, required: true },
    patient_height: { type: String, required: true },
    patient_weight: { type: String, required: true },
    patient_blood: { type: String, required: true },
    patient_gender: { type: String, required: true },
    problem: { type: String, required: true },
    report: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    doctor_name: { type: String, default: '' },
    doctor_spec: { type: String, default: '' },
    doctor_image: { type: String, default: '' },
    doctor_id: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now },
    approved: {type: String || Boolean, default: ''},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Appointment', schema);