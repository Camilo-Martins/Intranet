function fncValidateSesion(user, roles) {
  if(!user || !roles.includes(user.rol)){
    throw new Error("Acción no autorizada.")
  }

}

module.exports = fncValidateSesion;
