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
        ref: 'flight',
        required: true
    },
    seatID: {
        type: Schema.Types.ObjectId,
        ref: 'seatplan',
        required: true
    },
    paymentID: {
        type: Schema.Types.ObjectId,
        ref: 'paymentDetails',
        required: true
    },
    flightType:{
        type: String,
        required: true,
        default: null
    },
    reservationDate:{
        type: Date,
        required: true,
        immutable: true,
        default:Date.now,
        
    }
});

module.exports = mongoose.model("ReservationDetails", reservationDetailsSchema);