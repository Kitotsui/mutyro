import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: String,
    email: String,
    senha: String,
    cpf: String,
    telefone: String,
    endereco: String,
    dataNascimento: String,
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
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dunfagpl8/image/upload/v1751840306/mutyrouser_mjap7e.png",
      },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

UsuarioSchema.methods.toJSON = function () {
  var obj = this.toObject(); // transforma essa instancia em objeto em um objeto javascript
  delete obj.senha; // remove a senha do objeto..recebe o usuario sem a senha
  return obj;
};

export default mongoose.model("Usuario", UsuarioSchema);
