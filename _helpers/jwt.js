const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../app/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/static',
            '/user/cities',
            '/user/login',
            '/user/register',
            '/user/doctorregister',
            '/user/doctorlogin',
            '/user/settings/all',
            '/user/update/password',
            '/posts/cities',
            /static/
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};