import express from 'express'

const router=express.Router()
import {user_Get} from '../controller/Get/login.js'

router.get('/get' , user_Get)


export default router