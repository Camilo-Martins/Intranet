const mongoose = require('mongoose');

const adminsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    run:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        default: "ADMIN"
    },
    create:{
        type: Date,
        default: Date.now()
    }
})

module.exports = adminsSchema;
module.exports = mongoose.model('Admin', adminsSchema);