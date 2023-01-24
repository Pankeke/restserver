const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {

        await mongoose.connect(process.env.MONGODB_ATLAS);

        //Ya no se usa
        /*await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });*/

        mongoose.set('strictQuery', true);

        console.log('Conectado a base de datos');

        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}