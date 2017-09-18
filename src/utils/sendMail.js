const MailGun = require('mailgun-es6')
const Task = require('data.task')

const setupGun = ({ mailgun }) => {
  return new MailGun(mailgun)
}

const sendMail = (gun, config )=> {
  return new Task((rej, res) => {
    gun.sendEmail(config).then(res).catch(rej)
  })
}

module.exports = { sendMail, setupGun }
