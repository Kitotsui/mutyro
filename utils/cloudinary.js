import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const mutiraoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mutyro", // The name of the folder in Cloudinary to store images
    allowed_formats: ["jpeg", "png", "jpg"],
    transformation: [
      {
        // Redimensiona a imagem para caber dentro de uma caixa de to tamanho informado abaixo
        // 'limit' crop mode redimensiona apenas se a imagem for maior, mantendo a proporção.
        width: 500,
        height: 500,
        crop: "limit",

        // Aplica compressão automática com boa qualidade
        quality: "auto:good",

        // Converte para o formato de imagem mais eficiente que o browser do usuário suportar (ex: WebP, AVIF)
        fetch_format: "auto",
      },
    ],
  },
});

export const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mutyro/user",
    transformation: [
      {
        width: 500,
        height: 500,
        crop: "fill",
        gravity: "face",
        quality: "auto:good",
        fetch_format: "auto",
      },
    ],
  },
});
