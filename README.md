# Helldivers API

![Helldivers](/banner.jpg)

Unofficial Node.js API client for [Helldivers](http://arrowheadgamestudios.com/games/helldivers/) game status.

## Usage

```
$ npm install helldivers-api
```

```javascript
const API = require('helldivers-api')
const api = new API({
  expires: 60000 // Cache lifetime in ms
})
```

### Available methods

Get campaign status

```javascript
api.campaignStatus().then(data => console.log(data))
```