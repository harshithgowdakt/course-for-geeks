import ResponseGenerator from '../common/response-generator'
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const userModel = require('../models').User;
const config = require('../config/env-config');

const jwtOptions = {
    secretOrKey: config.jwt.secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export class Auth {
    async jwtAuthenticate(jwt_payload, next) {
        var user = await userModel.findByPk(jwt_payload.id).catch(next);
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }

    isAuthenticated(req, res, next) {
        passport.authenticate('jwt', { session: false }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.status(401).send(ResponseGenerator.generateErrorResponse("Unauthenticated request"));
            } else {
                return next();
            }
        })(req, res, next);
    }
}

let auth = new Auth();

export let jwtAuthStrategy = new JwtStrategy(jwtOptions, auth.jwtAuthenticate)
export let isAuthenticated = auth.isAuthenticated;