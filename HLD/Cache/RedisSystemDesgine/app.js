import express from 'express'
import connectDB from './config/db/conn.js'
import router from './router/routes.js'

const app=express()

let port=9000


app.use(router)

app.use(express.json())

connectDB()

app.listen(port , ()=>{
    console.log(port)
})