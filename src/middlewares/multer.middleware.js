import multer from 'multer';
import { join } from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = join(process.cwd(), 'public', 'temp');
    console.log("File Destination Path:", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    console.log("Original Filename:", file.originalname);
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });
