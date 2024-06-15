const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactDetailsSchema = new Schema({
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
        required: true,
        default: null
    },
    discount:{
        type: Number,
        default: null

    },
    payment_id:{
        type: Schema.Types.ObjectId,
        ref: "paymentDetails",
        required: true
    }
});

module.exports = mongoose.model("TransactDetails", transactDetailsSchema);
