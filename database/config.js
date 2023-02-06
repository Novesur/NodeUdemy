const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dbConnection = async()=>{
try {
  
 await mongoose.connect(process.env.MONGODB_CNN,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
 })   
 console.log('Base de datos Online')
} catch (error) {
    console.log(error)
    throw new error('Error al iniciar la base de Datos');
}
}
module.exports={
    dbConnection
}