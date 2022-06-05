const multer = require("multer")


exports.multiFile = (imageFile,songfile) => {
  // code here
  const storage = multer.diskStorage({
    destination: function(req, files, cb) {
      cb(null, "uploads") // path folder file penampung setelah di upload
    },
    filename: function(req, files, cb){
      cb(null, Date.now() + "-" + files.originalname.replace(/\s/g, "")) //format file
    }
  })

  const fileFilter = function (req, files, cb) {
    if (files.fieldname === imageFile) {
      if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp3|MP3|ogg|OGG|wav|WAV|flac|FLAC)$/)){ //filter extensi hrus jpg
        req.fileValidationError = {
          message: "Only image files are allowed"
        }
        return cb(new Error("Only image files are allowed"), false)
      }
    }
    // if (files.fieldname === songfile) {
    //   if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp3|MP3|ogg|OGG|wav|WAV|flac|FLAC)$/)){ //filter extensi hrus jpg
    //     req.fileValidationError = {
    //       message: "Only song files are allowed"
    //     }
    //     return cb(new Error("Only song files are allowed"), false)
    //   }
    // }
    cb(null, true)
  }

  const sizeInMB = 100
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields([
    {name:imageFile, maxCount:1},
    {name:songfile, maxCount:1}
])

  return ( req, res, next ) => {
    upload(req, res, function(err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select files to upload"
        })

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") { //filter ukuran file lebih dari 10mb
          return res.status(400).send({
            message: "Max file size 10MB"
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
};