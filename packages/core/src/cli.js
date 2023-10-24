#!/usr/bin/env node

const importLocal = require('import-local');

if (importLocal(__dirname)) {
  require('npmlog').info('xf', '当前使用本地库');
} else {
  require('..')(process.argv.slice(2));
}
