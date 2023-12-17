// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

const upload = multer({ storage });

// multer testing
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    res.json(req.body)
});