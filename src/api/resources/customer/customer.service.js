import Joi from "joi"
import bcrypt from "bcryptjs"

export default {
    encryptPassword(palinText) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(palinText, salt)
    },
    comparePassword(plainText, encryptedPassword){
        return bcrypt.compareSync(plainText, encryptedPassword)
    }, 
    validateSignup(body) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            isGold: Joi.boolean(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { value, error } = Joi.validate(body, schema);
        if(error && error.details) {
            return { error }
        }
        return { value }
    },
    validateLogin(body) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if(error && error.details) {
            return { error }
        }
        return { value }
    }
}