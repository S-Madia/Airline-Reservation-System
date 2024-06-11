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

    }
});

module.exports = mongoose.model("TransactDetails", transactDetailsSchema);
