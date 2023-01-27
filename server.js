//Imports
const express = require('express');
const multer = require('multer');
const { s3Upload } = require('./s3')

const app = express(); //express

const storage = multer.memoryStorage();

const upload = multer({
    storage,    
    limits: { fileSize: 1000000000 },
  }); //multer config

//POST requests
app.post('/upload', upload.array("file"),async (req, res) => {
    try {
        const results = await s3Upload(req.files);
        console.log(results);
        return res.json({ status: "success" });
      } catch (err) {
        console.log(err);
      }
})


app.listen(8080, () => console.log("listening on port 8080"));