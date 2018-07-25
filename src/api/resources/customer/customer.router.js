import express from "express"
import passport from "passport"
import customerCtrl from "./customer.ctrl"

export const customerRouter = express.Router()

customerRouter.post('/signup', customerCtrl.signup)
customerRouter.post('/login', customerCtrl.login)
customerRouter.get('/me', passport.authenticate('jwt', { session: false }), customerCtrl.authenticate)
customerRouter.route('/')
    .get(customerCtrl.findAll)
customerRouter.route('/:id')
    .get(customerCtrl.findOne)
    .put(customerCtrl.update)
    .delete(customerCtrl.delete)