const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    event_name: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Schedule', schema);