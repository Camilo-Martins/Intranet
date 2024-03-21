const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("email-validator");

const { User } = require("../../models/index");

const {
  fncCreateToken,
  fncGenerateEmail,
  fncGeneratePass,
  fncCalculateSalary,
  fncValidateSesion
} = require("../../helpers/index");

// ? Creación de Adminstrador
const createAdmin = async (_, { input }) => {
  const { email, password, run } = input;

  //* Validaciones bd
  const isUser = await User.findOne({ email });
  const runCheck = await User.findOne({ run });

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
  input.rol = "ADMIN";

  try {
    const admin = new User(input);
    await admin.save();
    return admin;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al registrar usuario ${error.message}`)
  }
};

// ? Inicio de sesión
const authUser = async (_, { input }) => {
  const { email, password } = input;

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new Error("Usuario no registrado.");
  }

  const checkPass = await bcryptjs.compare(password, isUser.password);
  if (!checkPass) {
    throw new Error("Error de credenciales.");
  }

  return {
    token: fncCreateToken(isUser, process.env.SECRET, "24H"),
  };
};

// ? Creación de Usuarios
const createUser = async (_, { input }, ctx) => {
  const { user } = ctx;
  const { recoveryEmail, totalHours, name, lastName, run, rol } = input;
  const isValidRol = ["ADMIN", "PRINCIPAL", "COORDINATOR"];

  //1.- Validaciones de sesión y rol
  if (fncValidateSesion(user, isValidRol)) {
    return error.message;
  }

  let salary = 0;

  //Validar que el usuario no esté registrado
  const isUser = await User.findOne({ run });
  if (isUser) {
    throw new Error("Ya existe un usuario asociado a este run.");
  }

  //generamos y hasheamos
  const secretPassword = await fncGeneratePass();
  const salt = await bcryptjs.genSalt(10);

  //email corporativo
  const email = name.substring(0, 2) + lastName + "@intranet.cl";

  //Creamos el usuario
  const newUser = new User(input);

  newUser.password = await bcryptjs.hash(secretPassword, salt);
  newUser.rol = rol;
  newUser.email = email;

  //salario
  if (rol !== "STUDENT") {
    salary = await fncCalculateSalary(totalHours, rol);
    newUser.salary = salary;
  }

  try {
    const result = await newUser.save();

    fncGenerateEmail({
      email,
      recoveryEmail,
      password: secretPassword,
      name,
      rol: rol,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al registrar usuario: ${error.message}`)
  }
};

const disableUser = async (_, { id }, ctx) => {
  const { user } = ctx;
  const isValidRol = ["ADMIN", "PRINCIPAL", "COORDINATOR"];
  //1.- Validaciones de sesión y rol
  if (fncValidateSesion(user, isValidRol)) {
    return error.message;
  }

  const activeUser = await User.findById(id);

  if (!activeUser) {
    throw new Error("El usuario que intentas desactivar no existe.");
  }

  if(activeUser.rol.includes(isValidRol)){
    throw new Error(`Solo puedes desactivar a profesores y alumnos`)
  }

  activeUser.isActive = !activeUser.isActive;


  try {
    await activeUser.save();
    return activeUser;
  } catch (error) {
    console.log(error);
    throw new Error(`Hubo un problema: ${error.message}`)
  }
};

module.exports = {
  createAdmin,
  createUser,
  authUser,
  disableUser,
};
