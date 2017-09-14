var MailGun = require('mailgun-es6')
var mailGun = new MailGun()

var html = require('./html')

var mymail = mailGun.sendEmail()

mymail.then(console.log, console.log)
