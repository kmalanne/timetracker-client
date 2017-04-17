var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH0_CLIENT_ID: '"I2wuPB35AiGPXoCMX5k0EnJE3nMU5GGB"',
  AUTH0_DOMAIN: '"kmalanne.eu.auth0.com"'
})
