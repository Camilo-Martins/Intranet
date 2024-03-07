const mongoose = require("mongoose");

getToken = async (_, { }, ctx) => {
    return ctx.user;
  }


module.exports = {
   getToken 
}