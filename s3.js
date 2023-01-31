// const S3 = require('aws-sdk/clients/s3')

// const s3 = new S3({
//     region: 'us-east-1',
//     accessKeyId: test,
//     secretAccessKey: test,
//   })

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3')
const uuid = require("uuid").v4;

var ep = new AWS.Endpoint('http://localhost:4566');


const s3 = new S3({
    // endpoint: ep, 
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

exports.list = async (bucketName) => {

    let bucketParams  = {Bucket : bucketName};

    await s3.listObjects(bucketParams)
    .then((data) => {
        data.Contents.forEach(obj => console.log(obj));
    })
    .catch(error => console.log(error));
};

exports.s3Upload = async (file) =>{
    // const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: 'my-bucket', //BucketName    
      Key: `uplolads/${file.filename}`, 
      Body: "upload", 
    }
  
    return await s3.upload(uploadParams).promise()
  }

