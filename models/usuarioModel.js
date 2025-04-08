import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: String,
        email: String,
        senha: String,
        cpf: String,
        telefone: String,
        //endereco: String,
        cidade: String,
        //estado: String,
        //cep: String,
        isAdmin: {
        //type: String,
        //enum: ['user', 'admin'],
        //default: 'user',
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
    );

    UsuarioSchema.methods.toJSON = function () {
      var obj = this.toObject(); // transforma essa instancia em objeto em um objeto javascript
      delete obj.senha;      // remove a senha do objeto..recebe o usuario sem a senha
      return obj;
    };

    export default mongoose.model("Usuario", UsuarioSchema);