const { readFile } = require('./utils/fs')
const Task = require('data.task')
const homedir = require('os').homedir()

const getConfig = Task.of(x => y =>
  Object.assign({}, { mailgun: JSON.parse(x) }, { emails: JSON.parse(y) })
)
  .ap(readFile(`${homedir}/.mailgun`))
  .ap(readFile('../mailgunrc.json'))

module.exports = { getConfig }
