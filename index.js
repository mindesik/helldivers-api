const request = require('request')
const moment = require('moment')

class API {
  constructor(config) {
    config = config || {}
    this.config = config
    this.config.expires = this.config.expires || 60000
    this.config.url = this.config.url || 'https://api.helldiversgame.com/1.0/'
    this.cache = {
      campaign: {
        data: null,
        cachedAt: 0,
      },
    }
  }

  campaign() {
    return new Promise((resolve, reject) => {
      if (moment().diff(this.cache.campaign.cachedAt) > this.config.expires || this.cache.campaign.data == null) {
        request({
          url: this.config.url,
          method: 'POST',
          strictSSL: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'User-Agent': 'bitsquid/1.00 libhttp/5.05 (PlayStation 4)',
          },
          form: {
            action: 'get_campaign_status',
          },
        }, (error, response, body) => {
          if (error || typeof response === 'undefined') {
            reject()
          }

          if (response.statusCode !== 200) {
            reject()
          }

          this.cache.campaign.data = JSON.parse(body)
          this.cache.campaign.cachedAt = moment()

          resolve(this.cache.campaign)
        })
      } else {
        resolve(this.cache.campaign)
      }
    })
  }
}

module.exports = API