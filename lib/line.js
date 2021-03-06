'use strict'

const oldToNew = require('vbb-translate-ids/old-to-new')
const lines  = require('vbb-lines')

const err400 = (msg) => {
	const err = new Error(msg)
	err.statusCode = 400
	return err
}



const route = (req, res, next) => {
	let id = req.params.id.trim()
	id = oldToNew[id] || id

	lines(true, id)
	.then((results) => {
		const line = results[0]
		if (!line) return next(err400('Line not found.'))
		res.json(line)
		next()
	})
	.catch((err) => {
		next(err)
		throw err
	})
}

module.exports = route
