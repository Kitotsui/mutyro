import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
    {
        //nome: String,
        email: String,
        //cpf: String,
        senha: String,
        //telefone: String,
        //endereco: String,
        //cidade: String,
        //estado: String,
        //cep: String,
        /*isAdmin: {
        type: Boolean,
        default: false,
        },*/
    },
    //{ timestamps: true }
    );

    export default mongoose.model("Login", loginSchema);