//Imports
const express = require('express');
const multer = require('multer');

const app = express(); //express

const upload = multer({ dest: "uploads/" }); //multer config

//POST requests
app.post('/upload', upload.array("file"), (req, res) => {
    res.json({status: "success"})
})


app.listen(8080, () => console.log("listening on port 8080"));