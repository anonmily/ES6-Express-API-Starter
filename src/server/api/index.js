import { Router } from 'express'
import test_route from './test'

export default function() {
	var api = Router()

	// mount the facets resource
	api.use('/test', test_route)

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		})
	})

	return api
}
