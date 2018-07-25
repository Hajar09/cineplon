import express from "express"
import passport from "passport"
import genreCtrl from "./genre.ctrl"

export const genreRouter = express.Router()
genreRouter.route('/')
    .post(/*passport.authenticate('jwt', {session: false}),*/ genreCtrl.create)
    .get(genreCtrl.findAll)
genreRouter.route('/:id')
    .get(genreCtrl.findOne)
    .post(genreCtrl.update)
    .delete(genreCtrl.delete)