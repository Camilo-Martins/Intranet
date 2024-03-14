const mongoose = require("mongoose");
function fncValidateID(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("ID no válido.");
  }
}

module.exports = fncValidateID;
