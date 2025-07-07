import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { mutiraoStorage, avatarStorage } from "./cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cria a pasta uploads se não existir
const uploadDir = path.join(__dirname, "../uploads");
import fs from "fs";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "imagemCapa-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// ARMAZENAMENTO CLOUDINARY
export const uploadMutiraoImage = multer({ storage: mutiraoStorage });
export const uploadAvatar = multer({ storage: avatarStorage });

// ARMAZENAMENTO LOCAL
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     // Aceita o arquivo (imagem, se existir) ou continua sem erro se não houver
//     cb(null, true);
//   },
// });
