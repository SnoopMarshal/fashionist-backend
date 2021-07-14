const S3 =  require('aws-sdk/clients/s3')
const multer  = require('multer')
const multerS3 = require('multer-s3')
const {aws_bucketName, aws_region, aws_accessKey, aws_secretKey} = require('../config');

const s3 = new S3({
    region: aws_region,
    accessKeyId: aws_accessKey,
    secretAccessKey: aws_secretKey,
    signatureVersion: 'v4'
})
function checkFileType( file, cb ){
    console.log(file);
    console.table({aws_bucketName, aws_region, aws_accessKey, aws_secretKey});
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
}

exports.upload = multer({
    storage: multerS3({
        s3,
        bucket: aws_bucketName,
        key: function (req, file, cb) {
            cb(null, 'images/'+Date.now().toString()+file.originalname.replace(' ','_'))
          }
    }),
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

