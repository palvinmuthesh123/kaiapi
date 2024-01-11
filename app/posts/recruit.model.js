const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    expert_id: { type: String, required: true },
    athelete_id: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Recruit', schema);