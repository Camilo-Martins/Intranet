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
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
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
        default: "ADMIN"
    },
    recoveryEmail:{
        type: String,
        required: true,
        trim: true,
        unique: true
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
    create:{
        type: Date,
        default: Date.now()
    }
})

module.exports = adminsSchema;
module.exports = mongoose.model('User', adminsSchema);