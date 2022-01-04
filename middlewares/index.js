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
        console.log(err);
        next(err);
    }
    
};

const auth = (req, res, next) => {
    try {
        const requesterToken = req.headers['x-auth-header'];
        console.log('Requested with token', req.headers);
        if (!token) throw 'NotAuth'

        const payload = token.verify(requesterToken);

        req.ctx = {
            requester: payload
        };

        next();

    } catch(err) {
        console.log('Auth Error happened', err);
        next(err);
        //res.status(401).send('Invalid token');
    }
}


module.exports = {
    toHashPassword,
    auth,
}