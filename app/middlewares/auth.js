const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const userModel = require('../models').User;
const config = require('../config/env-config');
const { generateErrorResponse } = require('../common/response-generator')

const jwtOptions = {
  secretOrKey: config.jwt.secretOrKey
};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

async function jwtAuthenticate(jwt_payload, next) {
  var user = await userModel.findByPk(jwt_payload.id).catch(next);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
}

function isAuthenticated(req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(generateErrorResponse("Unauthenticated request"));
    } else {
      return next();
    }
  })(req, res, next);
}

module.exports = {
  jwtAuthStrategy: new JwtStrategy(jwtOptions, jwtAuthenticate),
  isAuthenticated: isAuthenticated
}
