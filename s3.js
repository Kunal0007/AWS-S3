// const S3 = require('aws-sdk/clients/s3')

// const s3 = new S3({
//     region: 'us-east-1',
//     accessKeyId: test,
//     secretAccessKey: test,
//   })

const fs = require('fs');

var AWS = require('aws-sdk');

var ep = new AWS.Endpoint('http://localhost:4566');


const s3 = new AWS.S3({
    endpoint: ep,
    region: 'us-east-1',
    accessKeyId: 'test',
    secretAccessKey: 'test',
})

s3.listBuckets(function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename
    }
  
    return s3.upload(uploadParams).promise()
  }


