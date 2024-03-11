const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (user, word, exp) => {
  const { id, email, name, lastName, rol, run } = user;

  return jwt.sign(
    {
      id,
      name,
      lastName,
      run,
      email,
      rol,
    },
    word,
    {
      expiresIn: exp,
    }
  );
};

module.exports = createToken;
