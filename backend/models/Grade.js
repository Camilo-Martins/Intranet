const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    studentsQuantity:{
        type: Number,
        default: 0
    },
    minStudent:{
        type: Number,
        required: true
    },
    maxStudent:{
        type: Number,
        required: true
    },
    seccion: {
        type: String,
        default: "SELECCIONE"
    },
    headerTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    create:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Grade', gradeSchema);