const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    seatID: {
        type: String,
        required: true
    },
    travel_class:{
        type: [String],
        required: true,
    },
    seat_status:{
        type: Boolean,
        required: true,
    },
    res_seat_qty:{
        type:Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model("Services", servicesSchema);