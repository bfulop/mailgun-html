const { getConfig } = require('./getConfig')
const { sendMail } = require('./utils/sendMail')
const { List } = require('immutable-ext')
const Task = require('data.task')
const { readFile } = require('./utils/fs')

const processConfig = ({ mailgun, emails }) =>
  emails.paths.map(r => Object.assign({}, mailgun, {hats: 'shirts'}, { html: readFile(r) }))

const send = getConfig
  .map(processConfig)
  .map(List)
  .chain(xs => xs.traverse(Task.of, sendMail))
  .map(xs => xs.fold([]))

module.exports = { send }
