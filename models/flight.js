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
        
    },
    timeFlight:{
        type: String,
        required: true,
        
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

// flightSchema.methods.delflights = function(flightname){
    
//     return this.remove({startingLocation: new RegExp(flightname, 'i')})
// }
module.exports=mongoose.model("Flight", flightSchema);