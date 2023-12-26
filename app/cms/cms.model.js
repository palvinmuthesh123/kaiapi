const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    logo: { type: String },
    name: { type: String, required: true },
    image: { type: String, },
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    tagline: { type: String, },
    description: { type: String, },
    email: { type: String, },
    mobile: { type: String, },
    detail: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cms', schema);