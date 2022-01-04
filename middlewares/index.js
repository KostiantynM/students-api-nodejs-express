const { v4: uuidv4 } = require('uuid');
const {
    hash,
    token
} = require('../drivers');

const toHashPassword = (req, res, next) => {
    try {
        const { password } = req.body;
        
        const passwordHash = hash.hashSync(password, 10);
        req.body.password = passwordHash;
    
        next();
    } catch(err) {
        req.logger.error('Failed to hash password', err);
        next(err);
    }
    
};

const auth = (req, res, next) => {
    try {
        const requesterToken = req.headers['x-auth-header'];
        req.logger.info('Requested with token', req.headers);
        if (!token) throw 'NotAuth'

        const payload = token.verify(requesterToken, {logger: req.logger});

        req.ctx = {
            requester: payload
        };

        next();

    } catch(err) {
        req.logger.error('Auth Error happened', err);
        next(err);
    }
}

const injectRequestId = (identity = 'some_one') => (req, res, next) => {
    req.requestId = `${identity}-${uuidv4()}`;
    res.setHeader('x-requestid', req.requestId);
    next();
};

module.exports = {
    toHashPassword,
    auth,
    injectRequestId
}