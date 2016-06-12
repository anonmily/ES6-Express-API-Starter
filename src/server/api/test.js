// External Dependencies
import { Router } from 'express'
import is from 'simply-is'
import Promise from 'bluebird'

// Internal Dependencies
import { shasum } from '../lib/auth'

// MAIN

const router = Router()
router.get('/', function get_test(req,res,next){
	res.send('Hello world!')
})

export default router