import genreService from "./genre.service"
import Genre from "./genre.model"
import Joi from "joi"

export default {
    async create(req, res) {
        try {
            const { value, error } = genreService.validateBody(req.body)
            if(error && error.details) {
                return res.json(error)
            }
            const genre = await Genre.create(value)/*Object.assign({}, value, {ctomer: req.customer._id}))*/
            return res.json(genre)
        } catch (err) {
            console.error(err);
            return res.status(500).send(err)
        }
    },
    async findAll(req, res) {
        try {
            const { page, perpage } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perpage, 10) || 10,
            };
            const genres = await Genre.paginate({}, options)
            res.json(genres)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }, 
    async findOne(req, res) {
        try{
            const { id } = req.params
            const genre = await Genre.findById(id)
            if(!genre) {
                return res.status(404).json({
                    err: "could not find a genre"
                })
            }
            return res.json(genre)
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params
            const schema = Joi.object().keys({
                kind: Joi.string().required(),
                movies: Joi.array().items().required(),
            })
            const { value, error } = Joi.validate(req.body, schema)
            if(error && error.details) {
                return res.status(400).json(error)
            }
            const genre = await Genre.findByIdAndUpdate({
                _id:id,
            }, value, { new: true });
            if(!genre){
                return res.status(404).json({
                    err: 'could not find a genre'
                })
            }
            return res.json(genre)
        }catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            const genre = await Genre.findByIdAndRemove({ _id: id })
            if(!genre) {
                return res.status(404).json({
                    err: 'no genre found'
                })
            }
            return res.json({
                msg: 'song deleted'
            })
        }catch(err) {
            console.error(err)
            return res.status(500).send(err)
        }
    }
}