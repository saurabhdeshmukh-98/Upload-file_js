const router = require('express').Router()
const multer = require('multer')
const path =require('path')

const storage = multer.diskStorage({
    destination: './uploads',
     filename: function(_req, file, cb){ 
     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    } 
  });


var upload = multer({
    storage: storage,
    limits: {
        fields: 5,
        fieldNameSize: 50, // TODO: Check if this size is enough
        fieldSize: 10000, //TODO: Check if this size is enough
        fileSize: 1200000,  
    },
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
    
});

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /tiff/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/read',upload.single('postPicture'),(req,res)=>{
  if (!req.file.mimetype.includes("tiff")) {
    res.send("file not tiff..")
  }else if(req.file.size > 1024*1024){
    res.send("file size is to big please reduce..")
  } 
  else {
    res.send("file save sucssefully..")
  }
})

module.exports=router