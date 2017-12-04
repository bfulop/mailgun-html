const { readFile } = require('./utils/fs')
const Task = require('data.task')
const homedir = require('os').homedir()

const getConfig = conf => Task.of(x => y =>
  Object.assign({}, { mailgun: JSON.parse(x) }, { emails: y })
)
  .ap(readFile(`${homedir}/.mailgun`))
  .ap(Task.of(conf))

module.exports = { getConfig }
