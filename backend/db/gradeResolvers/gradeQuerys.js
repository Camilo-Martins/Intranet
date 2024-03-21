const mongoose = require("mongoose");
const { Grade, User, Subject } = require("../../models");

const getCalificationByGrade = async (_, {}, ctx) =>{
    
    const {user} = ctx
    const jaja  = []
    const student = await User.findById(user.id, "name lastName grade  rol")
    .populate("grade", "fullName headerTeacher")
    .populate("subjects", "name")
    .populate("califications" ,"name value subject") 
    console.log(student)
    try {
        
        return student;
    } catch (error) {
        throw new Error(error.message)
    }
    
   
}

module.exports ={
    getCalificationByGrade
}