const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for contact details
const contactDetailsSchema = new Schema({
    personalDetails: {
        type: Schema.Types.ObjectId,
        ref: 'PersonalDetails',
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    telno:{
        type: String,
        required: true,
    },
    emergency:{
        emergencyname:String,
        emergencyno:String

    },
    created:{
        type: Date,
        required: true,
        default:Date.now,
    }
});

module.exports = mongoose.model('ContactDetails', contactDetailsSchema);
