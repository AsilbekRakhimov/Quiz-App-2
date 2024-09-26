import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "./uploads");
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const fileKengaytmasi = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${fileKengaytmasi}`);
  },
});

export const upload = multer({ storage: storage });
