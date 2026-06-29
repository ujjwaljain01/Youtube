import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const memoryStorage = multer.memoryStorage();

export const memoryUpload = (options = {}) =>
  multer({ storage: memoryStorage, limits: { fileSize: 4 * 1024 * 1024, ...options } });

export const upload = multer({ storage });