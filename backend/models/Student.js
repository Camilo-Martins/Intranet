const mongoose = require('mongoose');

const StudentsSchema = mongoose.Schema({
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
})

module.exports = mongoose.model('Student', StudentsSchema);