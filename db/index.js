const mongoose = require('mongoose');
const config = require('../config');

mongoose
    .connect(
        config.databaseUrl + config.databaseName,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    )
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;

module.exports = db;
