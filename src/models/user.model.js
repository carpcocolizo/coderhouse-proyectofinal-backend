import mongoose from "mongoose"
 
const User = mongoose.model('Users',{
    username: {type: "string", required: true},
    password: {type: "string", required: true},
    firstname: {type: "string", required: true},
    address: {type: "string", required: true},
    age: {type: "mixed", required: true},
    telephonenumber: {type: "mixed", required: true},
    carrito: {type: "string", required: true},
    rol: {type: "string", default: "USER", required: false}
});

// El rol de usuario solo puede modificarse manualmente en la base de datos

export default User