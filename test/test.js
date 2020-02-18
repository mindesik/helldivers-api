const assert = require('assert')
const API = require('../index')
const api = new API({
  expires: 60000
})

describe('API', () => {
  this.timeout = 15000
  it('get campaign status', (done) => {
    api.campaignStatus().then((data) => {
      console.log(data)
      assert.equal(data.error_code, 0)
      done()
    })
  })
})