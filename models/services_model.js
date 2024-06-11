const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    serviceID: {
        type: String,
        required: true
    },
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

module.exports = mongoose.model("Services", servicesSchema);