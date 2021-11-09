const dotenv = require('dotenv');

dotenv.config();

const config = {
    serverPort: process.env.SERVER_PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    saltRounds: process.env.SALT_ROUNDS,
    databaseUrl: process.env.DATABASE_URL,
    databaseName: process.env.DATABASE_NAME,
    fileLocationUrl: process.env.FILE_LOCATION_URL,
};

module.exports = config;