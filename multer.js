import multer from "multer";

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads"); // Set the destination folder where uploaded files will be stored
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Generate a unique filename
    },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

export default upload;