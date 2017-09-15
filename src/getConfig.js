const { readFile } = require('./utils/fs')

const getConfig = readFile('~/.mailgun')
  .map(x => y => Object.assign({}, {mailgun: JSON.parse(x)}, {emails: JSON.parse(y)}))
  .ap(readFile('./mailgunrc.json'))

module.exports = { getConfig }
