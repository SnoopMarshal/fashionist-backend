const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoUri: process.env.MONGOURI,
    port: process.env.PORT,
    secretKey: process.env.SECRET,
}