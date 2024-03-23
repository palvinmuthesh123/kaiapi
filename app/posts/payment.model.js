const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    patient_id: { type: String, required: true }, 
    name: { type: String, required: true },
    payment_method: { type: String, required: true },
    total_amount: { type: String, required: true },
    discount: { type: String, required: true },
    status: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Payment', schema);