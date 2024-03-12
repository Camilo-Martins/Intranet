const mongoose = require("mongoose");

const User = require("../../models/User");
const Grade = require("../../models/Grade");

// ? Creacion de Cursos: Solo los directores y coordinadores puedes crear cursos
const createGrade = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { headerTeacher, name, seccion, minStudent, maxStudent } = input;
  if (!user) {
    throw new Error("Sesión caducada.");
  }
  if (user.rol !== "PRINCIPAL") {
    throw new Error("Solo los Coordinadores y Directores pueden crear cursos.");
  }

  //Lógica de la creación de cursos

  //1.- Asignar un docente: Validar que el usuario asignado sea solo de tipo docente
  const findTeacher = await User.findById(headerTeacher);
  const { rol, grade } = findTeacher;

  if (!findTeacher) {
    throw new Error("El Docente que intentas asignar no existe.");
  }

  if (rol !== "TEACHER") {
    throw new Error("Solo puedes asignar a docentes como Profesor Jefe.");
  }

  if (grade) {
    throw new Error(
      "El Docente ya está asignado a un curso, prueba asignando a otro."
    );
  }

  //2.- Validar que la seccion - Letra - no exista con el mismo nivel de Curso
  //  ejemplo: Cuarto B
  const fullName = (name + " " + seccion).toString();
  const isGrade = await Grade.findOne({ fullName });

  if (isGrade) {
    throw new Error(
      "Ya existe ese curso con esa letra, prueba asignando otra."
    );
  }

  //3.- Validar minimo y maximo del curso.
  if (minStudent < 0 || minStudent > maxStudent) {
    throw new Error(
      "El número mínimo debe ser mayor a 0 y menor a el máximo del curso."
    );
  }

  if (maxStudent < minStudent || maxStudent > 40) {
    throw new Error(
      "El número máximo debe ser igual o menor a 40 y mayor al mínimo del curso."
    );
  }

  const newGrade = new Grade(input);
  newGrade.fullName = fullName;

  try {
    //Hacer el insert del curso en la bd
    const result = await newGrade.save();

    //Asignamos el id del curso al Profesor Jefe
    findTeacher.grade = result._id;
    await findTeacher.save();

    return result;
  } catch (error) {
    console.log(error.message);
  }
};


// ? Asignación de estudiantes: Solo los directores y coordinadores pueden asignar estudiantes.
const assingStudents = async (_, { id, input }, ctx) => {
  const { user } = ctx;
  const { students } = input;

  //1.- Validaciones de sesión y rol
  if (!user) {
    throw new Error("Sesión caducada.");
  }
  if (user.rol !== "PRINCIPAL") {
    throw new Error("Solo los Coordinadores y Directores pueden crear cursos.");
  }

  //2.- Verificar id del Curso
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    throw new Error("El ID del Curso no es válido.");
  }

  //3.- Validar que exista el curso y que no tenga la capacidad máxima de estudiantes
  const isGrade = await Grade.findById(id);
  const { maxStudent, fullName } = isGrade;

  if (!isGrade) {
    throw new Error("El curso al que intentas asignar estudiantes no existe.");
  }

  if (students.length > maxStudent) {
    throw new Error("Estas superando la capacidad máxima de estudiantes.");
  }

  //4.- Validar que cada usuario asignado tenga el rol STUDENT y que no estén en otro curso.
  const studentPromises = students.map(async (studentId) => {
    try {
      const student = await User.findById(studentId);
      const { name, grade, rol } = student;

      if (rol !== "STUDENT") {
        throw new Error(
          `El usuario ${name} no tiene el rol correcto (STUDENT).`
        );
      }

      if (grade) {
        throw new Error(
          `El estudiante ${name} ya se encuentra asignado a un Curso.`
        );
      }

      //5.- Agregamos los nuevos estudiantes en el Array de students y validamos el máximo del curso
      isGrade.students = [...isGrade.students, studentId];
      if (isGrade.students.length > maxStudent) {
        throw new Error(`
          El Curso ${fullName} ha alcanzo su capacidad máxima. Agregue al estudiante ${name} a otro curso.
        `);
      }

      student.grade = id;
      await student.save();
    } catch (error) {
      throw new Error(
        `Error al procesar el estudiante con ID ${studentId}: ${error.message}`
      );
    }
  });

  isGrade.studentsQuantity = isGrade.students.length;

  try {
    await Promise.all(studentPromises);
    
    //6.- Si todo va bien, guardamos el Curso y retornamos el curso con los estudiantes agregados.
    await isGrade.save();
    return isGrade.populate("students");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  createGrade,
  assingStudents,
};
