const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactDetailsSchema = new Schema({
    paymentDetails: {
        type: Schema.Types.ObjectId,
        ref: 'paymentDetail',
        required: true
    },
    transact_Type: {
        type: String,
        required: true
    },
    transact_No:{
        type: String,
        required: true,
    },
    promo:{
        type: [String],
        required: false,
        default: null
    },
    discount:{
        type: Number,
        default: null

    },
});

module.exports = mongoose.model("TransactDetails", transactDetailsSchema);
