const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexion a la base de datos con exito!');
    } catch (error) {
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB;