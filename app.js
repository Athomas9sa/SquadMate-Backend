'use strict';

const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3333;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.js');
connectDB();

const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
};

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors(corsOptions));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.use('/', (req, res) => {
    res.send('API is running...');
})

const userController = require('./routes/userRoutes.js');

app.use('/user', userController);