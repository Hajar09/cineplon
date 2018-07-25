import express from "express"
import { movieRouter } from "./resources/movie"
//import { customerRouter } from "./resources/customer"
import { genreRouter } from "./resources/genre"

export const restRouter = express.Router()

restRouter.use('/movies', movieRouter)
//restRouter.use('/customers', customerRouter)
restRouter.use('/genres', genreRouter)