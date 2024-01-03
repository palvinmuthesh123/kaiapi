const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: {type: String, required: true},
    who: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    status: {type: String,},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('DoctorChat', schema);