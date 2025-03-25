import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: String,
        email: String,
        senha: String,
        cpf: String,
        //telefone: String,
        //endereco: String,
        //cidade: String,
        //estado: String,
        //cep: String,
        isAdmin: {
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
    );

    export default mongoose.model("Usuario", UsuarioSchema);