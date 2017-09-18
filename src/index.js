const { getConfig } = require('./getConfig')
const { sendMail, setupGun } = require('./utils/sendMail')
const { List } = require('immutable-ext')
const Task = require('data.task')
const { readFile } = require('./utils/fs')

const processConfig = conf =>
  List(conf.emails.paths).traverse(Task.of, fn =>
    readFile(fn).map(r => Object.assign({ html: r }, conf.emails, {gun: conf.gun}))
  )

const configMailgun = conf => setupGun(conf)

const send = getConfig
  .map(r => Object.assign(r, { gun: configMailgun({mailgun: r.mailgun}) }))
  .chain(processConfig)
  .chain(xs => xs.traverse(Task.of, fn => sendMail(fn.gun, fn)))
  .map(xs => xs.fold([]))

send.fork(console.error, console.log)

module.exports = { send }
