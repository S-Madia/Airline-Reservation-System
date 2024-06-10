const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactDetailsSchema = new Schema({
    transactionID: {
        type: Schema.Types.ObjectId,
        ref: 'transactionID',
        required: true
    },
    paymentID:{
        type: String,
        required: true,
    },
    paymentDue:{
        type: Date,
        required: true,
        default: null
    },
    amountPayment:{
        emergencyname:String,
        emergencyno:String

    },
    paymentStatus:{
        type: String,
        required: true
    }
});