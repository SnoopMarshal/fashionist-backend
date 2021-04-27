const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoUri: process.env.mongoURI,
    port: process.env.port,
    secretKey: process.env.secretKey,
}