import Joi from "joi"

export default {
    validateBody(body){
        const schema = Joi.object().keys({
            movies: Joi.array()
                .items()
                .required(),
            kind: Joi.string().required(),
            /*ctomer: Joi.array()
                .items()
                .required()*/
        })
        const { value, error } = Joi.validate(body, schema)
        if(error && error.details) {
            return { error }
        }
        return { value }
    }
}