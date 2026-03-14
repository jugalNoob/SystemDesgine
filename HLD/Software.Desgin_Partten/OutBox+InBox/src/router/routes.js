import express  from 'express'

import {user_form} from '../controller/post/pastBullmq.js'
const router=express.Router()



router.post('/add' , user_form)

export default router