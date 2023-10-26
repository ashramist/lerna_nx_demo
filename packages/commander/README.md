# node 项目如何支持ES Moudle 
## 通过webpack 构建的方式支持 
- 参考配置如下

```js
const path = require('node:path');
module.exports = {
  mode: 'development',
  entry: './bin/core.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'core.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                  helpers: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

```
## 通过原生esm的方式 ，将js 后缀改为mjs

###  node14 版本需要添加这个参数进行执行
--experimental-modules 