import Joi from "joi"
import JoiObjectId from "joi-objectid"
import Movie from "./movie.model"

export default {
    async create(req, res) {
        try {
            const schema = Joi.object().keys({
                title: Joi.string().required(), //.trim().minlength(5).maxlength(255),
                numberInStock: Joi.number().integer().required().min(0).max(255),
                dailyRentalRate: Joi.number().integer().required().min(0).max(255)
            });
            const {
                value, error
            } = Joi.validate(req.body, schema);
            if(error && error.details) {
                return res.status(400).json(error);
            }
            const movie = await Movie.create(value);
            return res.json(movie)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },
    async findAll(req, res) {
        try {
            const { 
                page,
                perPage
            } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                //populate: {
                    //path: ,
                    //select: ,
                //}
            };
            const movies = await Movie.paginate({}, options)
            res.json(movies)
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async findOne(req, res) {
        try{
            const { id } = req.params
            const movie = await Movie.findById(id) //ajouter le populate
            if(!movie) {
                return res.status(400).json({
                    err: "couldn\'t find a movie"
                })
            }
            return res.json(movie)
        } catch(err){
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async update(req, res) {
        try{
            const { id } = req.params
            const schema = Joi.object().keys({
                title: Joi.string().required(), //pb ajouter les autres caractéristiques
                numberInStock: Joi.number().integer().required().min(0).max(255),
                dailyRentalRate: Joi.number().integer().required().min(0).max(255)
            })
            const { value, error } = Joi.validate(req.body, schema);
            if(error && error.details) {
                return res.status(400).json(error)
            }
            const movie = await Movie.findOneAndUpdate({ _id: id}, value, {new: true})
            if(!movie) {
                return res.status(404).json({
                    err: "couldn'\t find a movie"
                })
            }
            return res.json(movie)
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async delete(req, res) {
        try{
            const { id } = req.params
            const movie = await Movie.findOneAndRemove({_id: id})
            if(!movie) {
                return res.status(404).json({
                    err: "no movie found"
                })
            }
            return res.json({ msg: "movie deleted"})
        } catch(err) {
            console.error(err)
            return res.status(500).send(err)
        }
    }
}