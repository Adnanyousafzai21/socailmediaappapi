

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
export const upload = multer({ 
    storage, 
})

// import multer from 'multer';

// const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
// export const upload = multer({ storage: storage });