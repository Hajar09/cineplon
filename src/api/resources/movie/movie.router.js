import express from "express"
import passport from "passport"
import movieCtrl from "./movie.ctrl"
import { isGld } from "../../middlewares/gold"

export const movieRouter = express.Router()

const vipPolicy = [passport.authenticate('jwt', {session: false}), isGld]

movieRouter.route('/')
    .post(vipPolicy, movieCtrl.create)
    .get(passport.authenticate('jwt', {
        session: false
    }), movieCtrl.findAll)
movieRouter.route('/:id')
    .get(passport.authenticate('jwt', {
        session: false
    }), movieCtrl.findOne)
    .put(vipPolicy, movieCtrl.update)
    .delete(vipPolicy, movieCtrl.delete)