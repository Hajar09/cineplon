import "dotenv/config"
import express from "express"
import volleyball from "volleyball"
import passport from "passport"
import { connect } from "./config/db"
import { restRouter } from "./api"

const app = express()
const { SERV_P } = process.env

connect()
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', restRouter)

app.get('/', (req, res) => {
    res.send("ça marche")
});


app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.message = 'route indisponible'
    error.status = 404
    next(error)
});


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.json({
        error:{
            msg: error.message
        }
    })
})


app.listen(SERV_P, (req, res) => {
    console.log(`My app is running on port: ${SERV_P}`)
});