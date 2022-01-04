const {
    hash,
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


module.exports = {
    toHashPassword,
}