const mongoose = require('mongoose');

const subjectsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Grade"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    create:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subject', subjectsSchema);