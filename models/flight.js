const mongoose=require('mongoose');
const flightSchema = new mongoose.Schema({
    staringLocation:{
        type: String,
        required: true,

    },
    destination:{
        type: String,
        required: true,

    },
    departure:{
        type: Date,
        required: true,
        default:Date.now,
    },
    return:{
        type: Date,
        required: true,
        default:Date.now,
    },
    created:{
        type: Date,
        required: true,
        default:Date.now,
    }
});
module.exports=mongoose.model("Flight", flightSchema);