const assert = require('assert')
const API = require('../index')
const api = new API({
  expires: 60000
})

this.timeout = 5000

describe('API', () => {
  it('get campaign status', (done) => {
    api.campaignStatus().then((data) => {
      console.log(data)
      assert.equal(data.error_code, 0)
      done()
    })
  })
})