const Task = require('data.task')
// const { List } = require('immutable-ext')

describe('index', function () {
  var subject

  afterEach(function () {
    td.reset()
  })

  before('set up stubs', function () {
    const mailgunconf = 'pants'
    const emails = {
      hats: 'shirts',
      paths: ['shoes', 'shorts']
    }
    const getConfig = td.replace('./getConfig')
    getConfig.getConfig = Task.of(
      Object.assign({}, { mailgun: mailgunconf }, emails)
    )

    const fs = td.replace('./utils/fs')
    td.when(fs.readFile('shorts')).thenReturn(Task.of('shortshtml'))
    td.when(fs.readFile('shoes')).thenReturn(Task.of('shoeshtml'))

    const sendMail = td.replace('./utils/sendMail')
    td
      .when(sendMail.sendMail(td.matchers.contains({ mailgun: mailgunconf, hats: 'shirts', html: 'shortshtml' })))
      .thenReturn(Task.of('shorts mail sent'))
    td
      .when(sendMail.sendMail(td.matchers.contains({ mailgun: mailgunconf, hats: 'shirts', html: 'shoeshtml' })))
      .thenReturn(Task.of('shoes mail sent'))

    subject = require('./index')
  })

  describe('sends email', function () {
    it('forwards info to sendMail', function () {
      subject.send.fork(console.error, t =>
        expect(t).to.eql(['shoes mail sent', 'shorts mail sent'])
      )
    })
  })
})
