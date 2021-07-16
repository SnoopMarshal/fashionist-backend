const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoUri: process.env.MONGOURI,
    port: process.env.PORT,
    secretKey: process.env.SECRET,
    aws_bucketName: process.env.AWS_BUCKET_NAME,
    aws_region: process.env.AWS_BUCKET_REGION,
    aws_accessKey: process.env.AWS_ACCESS_KEY,
    aws_secretKey: process.env.AWS_SECRET_KEY
}