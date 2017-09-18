const fs = require('fs')
const path = require('path')
const Task = require('data.task')

const readFile = filepath => {
  return new Task((reject, resolve) => {
    fs.readFile(path.resolve(filepath), 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const readFolder = path => path

module.exports = {readFile, readFolder}