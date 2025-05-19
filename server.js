const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/files', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
