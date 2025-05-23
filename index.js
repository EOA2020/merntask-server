const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors'); 

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//hablitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true}));

//definimos el puerto
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});