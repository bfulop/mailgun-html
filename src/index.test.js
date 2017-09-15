const Task = require('data.task')
// const { List } = require('immutable-ext')

describe('index', function () {
  var subject
  before('set up stubs', function () {
    const mailgunconf = { pants: 'pants' }
    const emails = { emails: ['shoes', 'shorts'] }
    const getConfig = td.replace('./getConfig')
    getConfig.getConfig = Task.of(Object.assign({}, {mailgun: mailgunconf}, emails))

    const sendMail = td.replace('./utils/sendMail')

    td.when(sendMail.sendMail(Object.assign({}, mailgunconf, {html: 'shoes'}))).thenReturn(Task.of('shoes mail sent'))
    td.when(sendMail.sendMail(Object.assign({}, mailgunconf, {html: 'shorts'}))).thenReturn(Task.of('shorts mail sent'))

    subject = require('./index')
  })

  describe('sends email', function () {
    it('forwards info to sendMail', function () {
      subject.send.fork(console.error, t => expect(t).to.eql(['shoes mail sent', 'shorts mail sent']))
    })
  })
})
