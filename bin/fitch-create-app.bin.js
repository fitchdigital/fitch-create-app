#!/usr/bin/env node
const pkg = require('../package.json')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const walk = require('walk')
const prompt = require('prompt')
const colors = require('colors/safe')
const ora = require('ora')

const spinner = ora('')

let title = ''
let description = ''
let template = ''

let startTime = 0

// --------------------------------------------------------------- AUX functions
function bash (script, onSuccess) {
  var ls = childProcess.exec(script, error => {
    if (error) {
      return console.log(error)
    }
    return onSuccess()
  })
}

function clearFolder (onComplete) {
  spinner.text = 'clear folders'

  bash(`rm -rf ${title.replace(/ /g, '-')}`, () => {
    onComplete()
  })
}

function createDirectory (onComplete) {
  spinner.text = 'create directory'

  bash(`mkdir ${title.replace(/ /g, '-')}`, () => {
    onComplete()
  })
}

function copyTemplate (onComplete) {
  spinner.text = 'copy template'

  const templatePath = path.join(__dirname, '..', 'templates', template)

  if (fs.existsSync(templatePath)) {
    bash(
      `cp -R ${templatePath}/ ${process.cwd()}/${title.replace(/ /g, '-')}`,
      () => {
        onComplete()
      }
    )
  } else {
    spinner.stop()
    console.log(colors.red('template not found'), colors.gray(templatePath))
  }
}

function parseFile (file) {
  fs.readFile(file, 'utf8', (err1, data) => {
    if (err1) return console.log(err1)

    const result = data
      .replace(/--TITLE--/g, title.replace(/ /g, '-'))
      .replace(/--DESCRIPTION--/g, description)

    fs.writeFile(file, result, 'utf8', err2 => {
      if (err2) {
        spinner.stop()
        console.log(err2)
      }
      return false
    })
    return false
  })
}

function updateFileReferences (onComplete) {
  spinner.text = 'update file references'

  const walker = walk.walk(`./${title.replace(/ /g, '-')}`, {
    followLinks: false,
    filters: ['node_modules']
  })

  walker.on('file', (root, fileStats, next) => {
    parseFile(`${root}/${fileStats.name}`)
    next()
  })

  walker.on('end', () => {
    onComplete()
  })
}

function installDependencies (onComplete) {
  spinner.text = 'preparing to install dependencies'

  const folder = title.replace(/ /g, '-')

  fs.readFile(`./${folder}/dependencies.txt`, 'utf8', (e, dependencies) => {
    if (e) {
      spinner.stop()
      return console.log(e)
    }
    if (dependencies) {
      fs.readFile(
        `./${folder}/devDependencies.txt`,
        'utf8',
        (r, devDependencies) => {
          if (r) {
            spinner.stop()
            return console.log(r)
          }
          if (devDependencies) {
            spinner.text = 'installing dependencies'

            bash(
              `npm install ${dependencies} --prefix ./${folder}`,
              function () {
                spinner.text = 'installing devDependencies'

                bash(
                  `npm install --save-dev ${devDependencies} --prefix ./${folder}`,
                  function () {
                    spinner.text = 'cleaning up'

                    bash(
                      `rm -rf ./${folder}/dependencies.txt ./${folder}/devDependencies.txt`,
                      function () {
                        onComplete()
                      }
                    )
                  }
                )
              }
            )
          }
        }
      )
    }
  })
}

function end () {
  spinner.stop()

  console.log('')
  console.log(
    colors.gray('completed in'),
    colors.green(`${Number(Date.now() - startTime)}ms`)
  )
}

// ------------------------------------------------------------------------ INIT
function init () {
  startTime = Date.now()

  spinner.start()

  clearFolder(() => {
    createDirectory(() => {
      copyTemplate(() => {
        updateFileReferences(() => {
          installDependencies(() => {
            end()
          })
        })
      })
    })
  })
}

// HERE
const step1 = {
  title: {
    pattern: /^[a-zA-Z0-9\s-]+$/,
    message: 'Name must be letters, numbers, spaces or dashes.',
    required: true
  },
  description: {
    required: false
  }
}

const step2 = {
  template: {
    pattern: /^[0-9\s]+$/,
    message: 'Only numbers are allowed.',
    required: true
  }
}

console.log('')
console.log(colors.cyan('fitch-create-app'), pkg.version)
console.log(colors.gray('Please enter your project details:'))

prompt.start()
prompt.message = ''
prompt.get(
  {
    properties: step1
  },
  (err, result1) => {
    if (!err) {
      title = result1.title
      description = result1.description

      console.log('')
      console.log(colors.gray('Please select the template:'))
      console.log(colors.cyan('(1)'), colors.gray('react (webpack)'))
      console.log(colors.cyan('(2)'), colors.gray('react (parcel)'))
      prompt.get({ properties: step2 }, (error, result2) => {
        switch (result2.template) {
          case '1':
            template = 'react'
            break
          case '2':
            template = 'parcel'
            break
          default:
            console.log(
              colors.red('invalid template:'),
              colors.gray('using react template')
            )
            template = 'react'
        }
        init()
      })
    }
  }
)
