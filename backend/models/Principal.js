const mongoose = require('mongoose');

const DirectorsSchema = mongoose.Schema({
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
    emailRecovery:{
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
    rol:{
        type: String,
    },
    create:{
        type: Date,
        default: Date.now()
    },
    phone:{
        type: Number,
        default: 99999999
    },
    salary:{
        type: Number,
        default: 0
    },
    totalHours:{
        type: Number,
        default: 1
    },
    age:{
        type: Number,
        default: 99
    },
    isActive:{
        type: Boolean,
        default: true
    },
    gender:{
        type: String,
        default: "NONE"
    },
    occupation:{
        type: String,
        default: "No especifica"
    },
})

module.exports = mongoose.model('Director', DirectorsSchema);