const mongoose=require('mongoose');
const flightSchema = new mongoose.Schema({
    startingLocation:{
        type: String,
        required: true,

    },
    destination:{
        type: String,
        required: true,

    },
    routecode:{
        type: String,
        required: true,

    },
    departure:{
        type: Date,
        required: true,
        default:Date.now,
    },
    timeFlight:{
        type: String,
        required: true,
        default:Date.now,
    },
    price:{
        type: Number,
        required: true,

    },
    created:{
        type: Date,
        required: true,
        default:Date.now,
    }
});
module.exports=mongoose.model("Flight", flightSchema);