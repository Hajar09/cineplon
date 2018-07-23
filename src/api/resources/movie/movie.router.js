import express from "express"
import passport from "passport"//à faire pour l'authentification
import movieCtrl from "./movie.ctrl"
//middlewares

export const movieRouter = express.Router()

movieRouter.route('/')
    .post(movieCtrl.create)
    .get(movieCtrl.findAll)
movieRouter.route('/:id')
    .get(movieCtrl.findOne)
    .put(movieCtrl.update)
    .delete(movieCtrl.delete)