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

  /**
   * Get campaign status
   * @return Promise
   */
  campaignStatus() {
    return new Promise((resolve, reject) => {
      if (moment().diff(this.cache.campaign.cachedAt) > this.config.expires || this.cache.campaign.data == null) {
        this.request({
          action: 'get_campaign_status',
        }).then((body) => {
          this.cache.campaign.data = body
          this.cache.campaign.cachedAt = moment()
          resolve(this.cache.campaign.data)
        }).catch((e) => {
          reject(e)
        })
      } else {
        resolve(this.cache.campaign.data)
      }
    })
  }

  /**
   * Send request
   * @param Object form
   * @return Promise
   */
  request(form) {
    return new Promise((resolve, reject) => {
      request({
        url: this.config.url,
        method: 'POST',
        strictSSL: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'User-Agent': 'bitsquid/1.00 libhttp/5.05 (PlayStation 4)',
        },
        form: form,
      }, (error, response, body) => {
        if (error || typeof response === 'undefined') {
          reject()
        }

        if (response.statusCode !== 200) {
          reject()
        }
        
        resolve(JSON.parse(body))
      })
    })
  }
}

module.exports = API