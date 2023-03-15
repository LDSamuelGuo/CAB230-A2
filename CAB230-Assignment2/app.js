const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const express = require('express');

const swaggerUi = require('swagger-ui-express');
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(helmet());
const knexOptions = require('./knexfile.js');
const knex = require('knex')(knexOptions);
app.use(cookieParser());
const swaggerDoc = require('./docs/swagger.json');

const countryRouter = require('./routes/countries');
const volcanoRouter = require('./routes/volcanoes');
const userRouter = require('./routes/users');

app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }, 
  })
);

app.use((req, res, next) => {
    req.db = knex;
    
    next();
});



logger.token('req', (req, res) => JSON.stringify(req.headers));
logger.token('res', (req, res) => { 
    const headers = {};
    res.getHeaderNames().map(h => headers[h] = res.getHeader(h));
    return JSON.stringify(headers);
});


app.get('/me', function(req, res) {
    res.status(200).json({
        name: 'Lingdong Guo',
        student_number: 'n10840656'
    });
});



app.use('/', volcanoRouter);
app.use('/countries', countryRouter);
app.use('/user', userRouter);




app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: 'Page not found!'
    });
});
    

const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync('/etc/ssl/private/node-selfsigned.key', 'utf-8');
const certificate = fs.readFileSync('/etc/ssl/certs/node-selfsigned.crt', 'utf-8');

const credentials = { 
    key: privateKey,
    cert: certificate
};

const server = https.createServer(credentials, app);
const port = process.env.PORT || '121';

server.listen(port);






module.exports = app