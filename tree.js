#!/usr/bin/env node
const { join } = require('path')
const { lstatSync, readdirSync, writeFileSync } = require('fs')

const TARGET_FILE = 'README.md'
const TARGET_DIR = '.'
let markup = '### The palest ink is better than the best memory(maybe)\n\n'
let indent = 0

const addIndent = () => new Array(indent * 2 + 1).join(' ')
const ignore = source => !/(README.md)|(tree.js)/g.test(source)
const isDirectory = source => lstatSync(source).isDirectory()
const isUnixHiddenPath = source => !/(^|\/)\.[^\/\.]/g.test(source)
const parseDirectory = source => `${addIndent()}- **${source}**\n`
const parseFile = (source, path) => `${addIndent()}- [${source}](${path})\n`
const parseResult = (result, source) => {
  result.forEach(name => {
    const path = join(source, name)
    if (isDirectory(path)) {
      markup += parseDirectory(name)
      indent++
      parseResult(readdirSync(path).filter(isUnixHiddenPath), path)
      indent--
    } else {
      markup += parseFile(name, path)
    }
  })
}

const ret = readdirSync(TARGET_DIR)
  .filter(isUnixHiddenPath)
  .filter(ignore)
parseResult(ret, TARGET_DIR)
writeFileSync(TARGET_FILE, markup)
