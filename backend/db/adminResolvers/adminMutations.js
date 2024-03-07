const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("email-validator");

const Admin = require("../../models/Admin");
const Student = require("../../models/Student");
const createToken = require("../../helpers/createToken");
const emailRegistro = require("../../helpers/generateEmail");
const generatePass = require("../../helpers/generateRandomPass");
const Teacher = require("../../models/Teacher");
const Principal = require("../../models/Principal");
const Coordinator = require("../../models/Coordinator");
const calculateSalary = require("../../helpers/calculateSalary");

// ? Creación de Adminstrador
const createAdmin = async (_, { input }) => {
  const { email, password, run } = input;

  //* Validaciones bd
  const isUser = await Admin.findOne({ email });
  const runCheck = await Admin.findOne({ run });

  if (isUser) {
    throw new Error("Ya existe un usuario vinculado a ese email.");
  }

  if (runCheck) {
    throw new Error("Ya existe ese run. Comuniquese con un Administrador.");
  }

  //* validaciones input

  if (password.length < 6) {
    throw new Error("El password debe tener 6 caracteres mínimo.");
  }

  if (password.length > 12) {
    throw new Error("El password debe tener 6 caracteres máximo.");
  }

  const isValid = validator.validate(email);

  if (!isValid) {
    throw new Error("Formato de email no válido.");
  }

  const salt = await bcryptjs.genSalt(10);

  input.password = await bcryptjs.hash(password, salt);
  input.role = "ADMIN";

  try {
    const admin = new Admin(input);
    await admin.save();
    return admin;
  } catch (error) {
    console.log(error);
  }
};

// ? Inicio de sesión
const authUser = async (_, { input }) => {
  const { email, password } = input;

  const isUser = await Admin.findOne({ email });

  if (!isUser) {
    throw new Error("Usuario no registrado.");
  }

  const checkPass = await bcryptjs.compare(password, isUser.password);
  if (!checkPass) {
    throw new Error("Error de credenciales.");
  }

  return {
    token: createToken(isUser, process.env.SECRET, "24H"),
  };
};

// ? Creación de Director
const createDirector = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { run, name, lastName, emailRecovery, rol, totalHours } = input;

  // Validar que el usuario se encuentre loggeado
  if (!user) {
    throw new Error("Acción no permitida.");
  }

  // Validar que el rol del usuario loggeado sea Admin
  if (user.role !== "ADMIN") {
    throw new Error("No cuentas con los permisos.");
  }

  const isPrincipal = await Principal.findOne({ run });

  //Validar que el estudiante no esté registrado
  if (isPrincipal) {
    throw new Error("Ya existe este run asociado a un Director.");
  }

  const isValid = validator.validate(emailRecovery);

  if (!isValid) {
    throw new Error("Formato de email no válido.");
  }

  //Creando email para estudiante
  const emailGenerated = name.substring(0, 2) + lastName + "@is.cl";
  input.email = emailGenerated;

  //Generando password
  const secretPassword = await generatePass();

  const salt = await bcryptjs.genSalt(10);

  //Hasheamos password
  input.password = await bcryptjs.hash(secretPassword, salt);

  //Generamos salario en funcion de las horas trabajadas
  input.salary = await calculateSalary(totalHours,rol);

  const newPrincipal = await Principal(input);

  try {
    const result = await newPrincipal.save();

    //Enviando credenciales al email de registro del usuario
    emailRegistro({
      emailRecovery,
      emailGenerated,
      password: secretPassword,
      name,
      rol,
    });

    return result;
  } catch (error) {
    console.log("El email ya se encuentra asignado.");
  }
};

// ? Creación de Coordinador
const createCoordinator = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { run, name, lastName, emailRecovery, rol, totalHours } = input;

  // Validar que el usuario se encuentre loggeado
  if (!user) {
    throw new Error("Acción no permitida.");
  }

  // Validar que el rol del usuario loggeado sea Admin
  if (user.role !== "ADMIN") {
    throw new Error("No cuentas con los permisos.");
  }

  const isCoordinator = await Coordinator.findOne({ run });

  //Validar que el estudiante no esté registrado
  if (isCoordinator) {
    throw new Error("Ya existe este run asociado a un Coordinador.");
  }

  const isValid = validator.validate(emailRecovery);

  if (!isValid) {
    throw new Error("Formato de email no válido.");
  }

  //Creando email para estudiante
  const emailGenerated = name.substring(0, 2) + lastName + "@is.cl";
  input.email = emailGenerated;

  //Generando password
  const secretPassword = await generatePass();

  const salt = await bcryptjs.genSalt(10);

  //Hasheamos password
  input.password = await bcryptjs.hash(secretPassword, salt);

  //Generamos salario en funcion de las horas trabajadas
  input.salary = await calculateSalary(360, totalHours ,rol);

  const newCoordinator = await Coordinator(input);

  try {
    const result = await newCoordinator.save();

    //Enviando credenciales al email de registro del usuario
    emailRegistro({
      emailRecovery,
      emailGenerated,
      password: secretPassword,
      name,
      rol,
    });

    return result;
  } catch (error) {
    console.log("El email ya se encuentra asignado.");
  }
};

// ? Creación de Profesor
const createTeacher = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { run, name, lastName, emailRecovery, rol, totalHours } = input;

  // Validar que el usuario se encuentre loggeado
  if (!user) {
    throw new Error("Acción no permitida.");
  }

  // Validar que el rol del usuario loggeado sea Admin
  if (user.role !== "ADMIN") {
    throw new Error("No cuentas con los permisos.");
  }

  const isTeacher = await Teacher.findOne({ run });

  //Validar que el estudiante no esté registrado
  if (isTeacher) {
    throw new Error("Ya existe este run asociado a un Docente.");
  }

  const isValid = validator.validate(emailRecovery);

  if (!isValid) {
    throw new Error("Formato de email no válido.");
  }

  //Creando email para docente
  const emailGenerated = name.substring(0, 2) + lastName + "@itdocente.cl";
  input.email = emailGenerated;

  //Generando password
  const secretPassword = await generatePass();

  const salt = await bcryptjs.genSalt(10);

  //Hasheamos password
  input.password = await bcryptjs.hash(secretPassword, salt);

  //Generamos salario en funcion de las horas trabajadas
  input.salary = await calculateSalary(totalHours ,rol);

  //Instanciamos el nuevo docente
  const newTeacher = await Teacher(input);

  try {
    //Si todo va bien, se agrega en la bd.
    const result = await newTeacher.save();

    //Enviando credenciales al email de registro del usuario
    emailRegistro({
      emailRecovery,
      emailGenerated,
      password: secretPassword,
      name,
      rol,
    });

    return result;
  } catch (error) {
    console.log("El email ya se encuentra asignado.");
  }
};

// ? Creación de Estudiante
const createStudent = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { run, name, lastName, emailRecovery, rol } = input;

  // Validar que el usuario se encuentre loggeado
  if (!user) {
    throw new Error("Acción no permitida.");
  }

  // Validar que el rol del usuario loggeado sea Admin
  if (user.role !== "ADMIN") {
    throw new Error("No cuentas con los permisos.");
  }

  const isStudent = await Student.findOne({ run });

  //Validar que el estudiante no esté registrado
  if (isStudent) {
    throw new Error("Ya existe este run asociado a un estudiante.");
  }

  const isValid = validator.validate(emailRecovery);

  if (!isValid) {
    throw new Error("Formato de email no válido.");
  }

  //Creando email para estudiante
  const emailGenerated = name.substring(0, 2) + lastName + "@is.cl";
  input.email = emailGenerated;

  //Generando password
  const secretPassword = await generatePass();

  const salt = await bcryptjs.genSalt(10);

  //Hasheamos password
  input.password = await bcryptjs.hash(secretPassword, salt);

  //Generamos salario en funcion de las horas trabajadas
  const newStudent = await Student(input);

  try {
    const result = await newStudent.save();

    //Enviando credenciales al email de registro del usuario
    emailRegistro({
      emailRecovery,
      emailGenerated,
      password: secretPassword,
      name,
      rol,
    });

    return result;
  } catch (error) {
    console.log("El email ya se encuentra asignado.");
  }
};

module.exports = {
  createAdmin,
  authUser,
  createDirector,
  createCoordinator,
  createTeacher,
  createStudent,
};
