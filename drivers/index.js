const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jsonSecret = process.env.JSON_SECRET;

const token = {
    sign: (options) => jsonwebtoken.sign(options, jsonSecret),
    verify: (token) => {
        try {
            const decoded = jsonwebtoken.verify(token, jsonSecret);
            console.log('Succsessfully decoded', {decoded});
            decoded;
        } catch (err) {
            console.log('Filed to verify token', err);
            throw err;
        }
    }
};


module.exports = {
    hash: bcrypt,
    token
};