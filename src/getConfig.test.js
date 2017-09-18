const Task = require('data.task')

describe('getConfig', function () {
  var subject

  afterEach(function () {
    td.reset()
  })

  before('set up stubs', function () {
    const fs = td.replace('./utils/fs')
    const mailgunsecret = {pants: 'olive'}
    const mailgunconf = {shorts: 'orange'}
    td.when(fs.readFile(td.matchers.contains('/.mailgun'))).thenReturn(Task.of(JSON.stringify(mailgunsecret)))
    td.when(fs.readFile('../mailgunrc.json')).thenReturn(Task.of(JSON.stringify(mailgunconf)))

    subject = require('./getConfig')
  })

  describe('get config files', function () {
    it('passes the result', function () {
      subject.getConfig.fork(console.error, t => expect(t).to.eql({mailgun: {pants: 'olive'}, emails: {shorts: 'orange'}}))
    })
  })
})
