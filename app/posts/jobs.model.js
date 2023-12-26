const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    post: { type: String, required: true },
    salary: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    contract: { type: String, required: true },
    company_name: { type: String, required: true },
    tags: { type: String, required: true },
    responsibility: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Jobs', schema);