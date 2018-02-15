# Helldivers API

![Helldivers](/banner.jpg)

API client for [Helldivers](http://arrowheadgamestudios.com/games/helldivers/) game status.

## Usage

```javascript
const API = require('helldivers-api')
const api = new API({
  expires: 60000 // Cache lifetime in ms
})
```

### Get campaign status

```javascript
api.campaignStatus().then(data => console.log(data))
```