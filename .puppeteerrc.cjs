const { join } = require('path')

module.exports = {
  // Specify cache directory for Puppeteer
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  // Specify which Chromium version Puppeteer should install
  executablePath: '/opt/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
}
