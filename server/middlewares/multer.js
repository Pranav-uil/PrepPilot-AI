import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "public")
    },

    filename: function(req , file , cb){
        const filename = Date.now() + "-" + file.originalname;
        cb(null , filename)
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});



// 1. Why do we need Multer?
// Suppose you're building your MERN stack interview preparation app, and a user uploads a profile picture or resume.
// The frontend sends the file to your backend. Multer receives and processes that uploaded file so your backend can access it.

// Multer does not automatically save files to MongoDB or cloud storage. In this example, it saves the file locally in the uploads/ folder. You can separately upload it to Cloudinary, Amazon S3, or another storage service.