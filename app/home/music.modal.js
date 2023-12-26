const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId      :   { type: String, required: true},
    title       :   { type: String, default: "" },
    artist      :   { type: String, default: "" },
    file        :   { type: String, required: true, default: "" },
    createdDate :   { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Music', schema);