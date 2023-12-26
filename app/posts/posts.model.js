const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    feel: { type: String, default: '' },
    wishlist: { type: String, default: '0' },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);