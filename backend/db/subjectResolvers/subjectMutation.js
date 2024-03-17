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

// ? Asignación de estudiantes: Solo los directores y coordinadores pueden asignar estudiantes.
const assingSubjectStudents = async (_, { id, input }, ctx) => {
  const { user } = ctx;
  const { students } = input;
  const isValidRol = ["PRINCIPAL", "COORDINATOR"];
  //1.- Validaciones de sesión y rol
  if (fncValidateSesion(user, isValidRol)) {
    return error.message;
  }

  //2.- Valida ID de la asignatura
  if (fncValidateID(id)) {
    return error.message;
  }

  const isSubject = await Subject.findById(id).populate("grade", "students");
  const {grade} = isSubject;
  if (!isSubject) {
    throw new Error("La asignatura no fue encontrada.");
  }

  //3.- Validaciones estudiantes
  //3.1.- El usuario debe tener el rol estudiante
  //3.2.- Debe pertenecer el Curso
  //3.3.- No debe estar registrado en la misma asignatura 2 veces o más.
  const studentPromises = students.map(async (studentId) => {
    try {
      const student = await User.findById(studentId);
      const { name,  rol } = student;

      if (!grade.students.includes(studentId)) {
        throw new Error("El estudiante no pertenece al curso.");
      }

      if (rol !== "STUDENT") {
        throw new Error(
          `El usuario ${name} no tiene el rol correcto (STUDENT).`
        );
      }

      if (isSubject.students.includes(studentId)) {
        throw new Error(
          `El estudiante ${name} ya se encuentra en esta asignatura.`
        );
      }

       //4.- Agregamos los estudiantes en la asignatura
       isSubject.students.push(studentId)

       //5.- Agregamos los nuevos estudiantes en el Array de students y validamos el máximo del curso
       student.subjects.push(id);
       
       await Promise.allSettled([isSubject.save(), student.save()]);
      
    } catch (error) {
      throw new Error(
        `Error al procesar el estudiante con ID ${studentId}: ${error.message}`
      );
    }
  });

  try {
    await Promise.all(studentPromises);

    //6.- Si todo va bien, guardamos el Curso y retornamos el curso con los estudiantes agregados.
    return isSubject.populate("students")
  } catch (error) {
    throw new Error(error.message);
  }
};

const unassingSubject = async (__, { input }, ctx) => {};

module.exports = {
  createSubject,
  unassingSubject,
  assingSubjectStudents,
};
