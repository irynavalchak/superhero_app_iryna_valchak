// import multer from "multer";
// import path from "path";

// // Де зберігати файли
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // папка uploads
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Типи файлів
// const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
//   if (file.mimetype.startsWith("image/")) cb(null, true);
//   else cb(new Error("Only images allowed"), false);
// };

// export const upload = multer({ storage, fileFilter });
import multer from "multer";
import path from "path";

// Де зберігати файли
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Приймати лише зображення
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

export const upload = multer({ storage, fileFilter });