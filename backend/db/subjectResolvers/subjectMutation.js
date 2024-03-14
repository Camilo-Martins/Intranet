const mongoose = require("mongoose");
const { fncValidateSesion, fncValidateID } = require("../../helpers/index");
const { User, Grade, Subject } = require("../../models/index");

const createSubject = async (__, { id, input }, ctx) => {
  const { user } = ctx;
  const { name, teacher } = input;
  const isValidRol = ["PRINCIPAL", "COORDINATOR"];

  //1.- Validaciones de sesión y rol
  if (fncValidateSesion(user, isValidRol)) {
    return error.message;
  }

  //2.- Valida ID del curso
  if (fncValidateID(id)) {
    return error.message;
  }

  const isGrade = await Grade.findById(id)
    .select("id name subject")
    .populate("subjects", " name");
  if (!isGrade) {
    throw new Error("Curso no encontrado.");
  }
  if (isGrade.subjects.some((asignatura) => asignatura.name === name)) {
    throw new Error(
      `La asignatura con el nombre: ${name} ya está anexada al curso.`
    );
  }

  //3.- Verificar que el docente no esté asignado a un curso
  const isTeacher = await User.findById(teacher);
  if (isTeacher.subjects.length > 0) {
    throw new Error(`El docente ya tiene una asignatura.`);
  }

  const newSubject = await new Subject(input);
  newSubject.grade = isGrade.id;

  try {
    const result = await newSubject.save();

    isGrade.subjects.push(result._id);
    isTeacher.subjects.push(result._id);

    await isGrade.save();
    await isTeacher.save();

    return result;
  } catch (error) {
    return error;
  }
};

const unassingSubject = async (__, { input }, ctx) => {};

module.exports = {
  createSubject,
  unassingSubject,
};
