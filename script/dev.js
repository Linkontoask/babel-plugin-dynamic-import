const babel = require('@babel/core')
const fs = require('fs-extra')
const optionsObject = require('../babel.config')

const bableResult = babel.transform(
  `
  import { Button } from 'v-easy-components'
  import { h } from 'vue'
  import { Input } from 'v-easy-components'

  const name = h
  const name1 = Input
  // const name2 = Button
`,
  optionsObject
)

fs.writeFile('output.js', bableResult.code)
