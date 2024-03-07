const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (user, word, exp) => {
  const { id, email, name, lastName, role, run } = user;

  return jwt.sign(
    {
      id,
      name,
      lastName,
      run,
      email,
      role,
    },
    word,
    {
      expiresIn: exp,
    }
  );
};

module.exports = createToken;
