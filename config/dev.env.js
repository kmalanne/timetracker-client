var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '',
  AUTH0_CLIENT_ID: '',
  AUTH0_DOMAIN: ''
})
