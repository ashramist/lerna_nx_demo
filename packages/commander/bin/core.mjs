#!/usr/bin/env node
import utils from './utils.mjs';
import path from 'node:path';

utils();

console.log(path.join(__dirname, '/test'));

async function testAsync() {
  return new Promise((resolve, reject) => {
    resolve(10);
  });
}

testAsync().then((res) => {
  console.log(res);
});
