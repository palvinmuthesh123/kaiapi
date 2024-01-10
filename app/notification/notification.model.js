const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: { type: String },
    logo: { type: String },
    name: { type: String },
    image: { type: String },
    title: { type: String },
    createdDate: { type: Date, default: Date.now },
    tagline: { type: String, },
    description: { type: String, },
    email: { type: String, },
    mobile: { type: String, },
    detail: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Notification', schema);