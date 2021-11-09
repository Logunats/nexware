const express = require('express');
const cors = require('cors')
const config = require('./config');

const db = require('./db');

const app = express();

app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.serverPort, () => console.log(`Server running on port ${config.serverPort}`));
