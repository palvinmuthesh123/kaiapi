const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    video: { type: String, required: true },
    category: { type: String },
    subcategory: { type: String },
    desc: { type: String },
    subtitle: { type: String },
    thumbnail: { type: String },
    fundamentals: { type: String },
    techniques: { type: String },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Sports', schema);