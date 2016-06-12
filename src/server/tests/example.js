import should from 'should'
import supertest from 'supertest'
import { expect } from 'chai'

describe('Mocha tests', () => {
	it('should pass', done => {
		expect(true).to.equal(true)
		done()
	})
})