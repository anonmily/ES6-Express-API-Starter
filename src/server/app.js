// External/Third-party Dependencies
import express from 'express'
import path from 'path'
import compression from 'compression'
import cookie_parser from 'cookie-parser'
import cors from 'cors'
import body_parser from 'body-parser'
import domain from 'domain'
import cluster from 'cluster'

// Internal Dependencies
import db from './db'
import middleware from './middleware'
import api from './api'
import {
	request_domain_error_handler,
	development_error_handler,
	production_error_handler
} from './lib/errorhandlers'

// Constants
const env = process.env
console.log(`NODE_ENV = ${env['NODE_ENV']}`)

// Application
var app = express()
app.locals.requests = 0
app.set('x-powered-by', false)

// Middleware - Application-wide
app.use(cors({
	exposedHeaders: ['Link']
}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use(cookie_parser())
app.use(compression())

// Each request runs on its own domain, so an error in a request doesn't crash everything
app.use(function domain_middleware(req, res, next) {
	const d = domain.create()
	console.log(app.locals)
	d.id = new Date().getTime() + (app.locals.requests++);
	d.add(req)
	d.add(res)
	d.run(function() {
		next()
	})
	d.on('error', request_domain_error_handler )
})

// Routes
db(λ => {
	// internal middleware
	app.use(middleware())

	// api router
	app.use('/', api())

	app.use('/error', function(req, res, next) {
		// Because each request runs on its own domain, errors are handled  by the request_domain_error_handler
		throw new Error('error! mayday! mayday!')
	})

})

// Error handlers
if (env['NODE_ENV'] !== 'PRODUCTION') {
	app.use( development_error_handler )
} else {
	app.use( production_error_handler )
}

export default app