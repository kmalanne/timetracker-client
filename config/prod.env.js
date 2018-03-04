module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL),
  AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
  AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN)
}
