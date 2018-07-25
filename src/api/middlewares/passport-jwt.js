import Passport from "passport"
import PassportJWT from "passport-jwt"
import { devConfig } from "../../config/env/devpment"
import Customer from "../resources/customer/customer.model"

export const configJWTStrategy = () => {
    const opts = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: devConfig.secret
    };
    Passport.use(
        new PassportJWT.Strategy(opts, (paylod, done) => {
            Customer.findOne({
                _id: paylod.id
            }, (err, customer) => {
                if (err) {
                    return done(err)
                }
                if (customer) {
                    return done(null, customer)
                }
                return done(null, false)
            
            });
        })
    )
}