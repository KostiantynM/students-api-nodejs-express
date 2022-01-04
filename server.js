const express = require('express'),
    cookieParser = require('cookie-parser'),
    log = require('morgan'),
    path = require('path'),
    cors = require('cors'),
    multer = require('multer'),
    dotEnv = require('dotenv'),
    upload = multer(),
    app = express();
const {name: identity} = require('./package.json');

    dotEnv.config();

const PORT = process.env.PORT || 3000,
    NODE_ENV = process.env.NODE_ENV || 'development';

const db = require('./db');
const { 
    logger: {
        init: initLogger,
        initWithContext: initLoggerWithContext 
    }
} = require('./common');
const {injectRequestId} = require('./middlewares');

const logger = initLogger();

const serverRun = async () => {
    app.set('port', PORT);
    app.set('env', NODE_ENV);

    await db.initConnection({logger});
    
    app.use(cors());
    app.use(log('tiny'));
    
    // parse application/json
    app.use(express.json());
    
    // parse raw text
    app.use(express.text());
    
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    // parse multipart/form-data
    app.use(upload.array()); 
    app.use(express.static('public'));
    
    app.use(cookieParser());

    app.use(injectRequestId(identity));

    app.use((req, res, next) => {
        req.logger = initLoggerWithContext({ requestId: req.requestId });
        next();
    });
    
    require('./routes')(app);
    
    // catch 404
    app.use((req, res, next) => {
        req.logger.warn(`Error 404 on ${req.url}.`);
        res.status(404).send({ status: 404, error: 'Not found' });
    });
    
    // catch errors
    app.use((err, req, res, next) => {
        req.logger.error('Custom error handler got an error', err);
        const status = err.status || 500;
        const msg = err.error || err.message;
        // log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
        res.status(status).send({ status, error: msg });
    });
    
    module.exports = app;
    
    
    
    app.listen(PORT, () => {
        logger.info(
            `Express Server started on Port ${app.get(
                'port'
            )} | Environment : ${app.get('env')}`
        );
    });
};

serverRun();