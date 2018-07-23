import express from "express"
import { movieRouter } from "./resources/movie"

export const restRouter = express.Router()

restRouter.use('/movies', movieRouter)
//restRouter.use('/customers', customerRouter)