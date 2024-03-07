const moongose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connectDB = async () =>{
    try {
        await  moongose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("DB contectada")

    } catch (error) {
        console.log("Error al conectar");
        console.log(error)
        process.exit();
    }
}

module.exports = connectDB;