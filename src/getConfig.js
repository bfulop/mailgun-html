const { readFile } = require('./utils/fs')
const Task = require('data.task')

const getConfig = Task.of(x => y => Object.assign({}, {mailgun: JSON.parse(x)}, {emails: JSON.parse(y)})) 
  .ap(readFile('~/.mailgun'))
  .ap(readFile('./mailgunrc.json'))

module.exports = { getConfig }
