const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    servicePackage:{
        type: [String],
        required: true,
    },
    serviceDesc:{
        type: String,
        required: true,
    },
    reservationID:{
        type:Schema.Types.ObjectId,
        ref:"reservation",
        required: true,
    }
});

module.exports = mongoose.model("ServiceDetails", servicesSchema);