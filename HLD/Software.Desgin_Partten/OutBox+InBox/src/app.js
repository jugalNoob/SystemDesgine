import express from 'express'
import router from './router/routes.js'


const app=express()


const port=9000

app.use(express.json())

app.use(router)

process.on('uncaughtException', err => {
  console.error("🚨 Uncaught Exception:", err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error("🚨 Unhandled Rejection:", err);
  process.exit(1);
});


app.listen(port , ()=>{
  console.log(port)
})
