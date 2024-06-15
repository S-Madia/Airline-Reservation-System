const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentDetailsSchema = new Schema({
    transactionID: {
        type: Schema.Types.ObjectId,
        ref: 'transactionDetails',
        required: true
    },
    paymentDue:{
        type: Date,
        required: true,
        default: null
    },
    amountPayment:{
        type:Number,
        required: true
    },
    paymentStatus:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);