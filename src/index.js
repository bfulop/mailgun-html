const { getConfig } = require('./getConfig')
const { sendMail } = require('./utils/sendMail')
const { List } = require('immutable-ext')
const Task = require('data.task')

const send = getConfig
  .map(({ mailgun, emails }) => emails.map(r => Object.assign({}, {html: r})))
  .map(List)
  .chain(xs => xs.traverse(Task.of, sendMail))
  .map(xs => xs.fold([]))

module.exports = { send }
