const { getConfig } = require('./getConfig')
const { sendMail } = require('./utils/sendMail')
const { List } = require('immutable-ext')
const Task = require('data.task')
const { readFile } = require('./utils/fs')

const processConfig = conf =>
  List(conf.paths).traverse(Task.of, fn =>
    readFile(fn).map(r => Object.assign({}, { html: r }, conf))
  )

const send = getConfig
  .chain(processConfig)
  .chain(xs => xs.traverse(Task.of, fn => sendMail(fn)))
  .map(xs => xs.fold([]))

module.exports = { send }
