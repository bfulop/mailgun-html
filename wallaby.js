module.exports = function (wallaby) {
  return {
    files: [
      'src/getConfig.js',
      'src/*.js',
      { pattern: 'src/*.test.js', ignore: true },
      {
        pattern: 'src/utils/*.js',
        instrument: false,
        load: true,
        ignore: false
      }
    ],

    tests: ['src/*.test.js'],

    testFramework: 'mocha',

    env: {
      type: 'node'
    },

    setup: function (wallaby) {
      global.insp = f => (f && f.inspect ? f.inspect() : f)
      global.td = require('testdouble')
      global.expect = require('chai').expect
    }
  }
}
