//JWT= header, payload, signature 
//headet= have algorithm to encrypt the token
//paylaod=contains information of user
//signature= contains token to be passed in header(it is encrypted)

const passport=require('passport');
const  JwtStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'sports'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
            console.log('err is finding the user ',err);
            return ;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
})); 

module.exports=passport;