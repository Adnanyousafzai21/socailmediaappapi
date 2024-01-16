
import multer from "multer"
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = 'public/temp';
      console.log("File Destination Path:", destinationPath);
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      console.log("Original Filename:", file.originalname);
      cb(null, file.originalname);
    }
});  
  export const upload = multer({ storage: storage })