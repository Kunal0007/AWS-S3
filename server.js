//Imports
const express = require('express');
const multer = require('multer');
const { s3Upload, list } = require('./s3')

const app = express(); //express

const storage = multer.memoryStorage(); //create memory store

const upload = multer({storage: storage}); //multer config

//POST requests
app.post('/upload', upload.single("file"), async (req, res) => {
    try {
        const results = await s3Upload(req.file); 
        console.log(results);
        return res.json({ status: "success" });
      } catch (err) {
        console.log(err);
      }
})

//GET 

app.get('/files', async (req, res) => {
  let {bucketName} = req.body;
  try {
    list(bucketName);
  } catch (error) {
    console.log(err);
  }
})


app.listen(8080, () => console.log("listening on port 8080"));