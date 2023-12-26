const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    created_by: {type: String, required: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Resource', schema);