const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationDetailsSchema = new Schema({
    passengerID: {
        type: Schema.Types.ObjectId,
        ref: 'personalDetail',
        required: true
    },
    flightID: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    seatID: {
        type: Schema.Types.ObjectId,
        ref: 'seatDetails',
        required: true
    },
    transactionID: {
        type: Schema.Types.ObjectId,
        ref: 'TransactionDetails',
        required: true
    },
    flightType:{
        type: String,
        required: true,
        default: null
    },
    flightStatus:{
        type: String,
        required: true,
        default: "Reserved"
    },
    reservationDate:{
        type: Date,
        required: true,
        immutable: true,
        default:Date.now,
        
    }
});

module.exports = mongoose.model("ReservationDetails", reservationDetailsSchema);