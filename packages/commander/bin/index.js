#!/usr/bin/env node

const { Command } = require('commander');
const pkg = require('../package.json');

const program = new Command();

program
  .usage('<command> [options]')
  .name(pkg.name)
  .description('CLI demo show')
  .option('-d, --debug', '是否开启调试', false)
  .option('-e, --env-name <name>', '获取环境变量名称')
  .version(pkg.version);

// clone 命令注册
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f, --force', '是否强制克隆')
  .action((source, destination, options) => {
    console.log('do clone', source, destination, options);
  });

// add command 注册子命令

const service = new Command('service')
  .command('start <service>', '开启一个具名服务')
  .action((service) => {
    console.log(`${service}已被开启`);
  });
service
  .command('stop [service]', '关闭一个具名服务或者关闭所有服务')
  .action((service) => {
    if (service) {
      console.log(`${service}已被关闭`);
    } else {
      console.log('所有服务都终止了');
    }
  });

// 添加子命令
program.addCommand(service);

// <>代表必传，[] 代表可选参数
// program
//   .command('create')
//   .description('创建工程')
//   .argument('<name>', '工程名')
//   .action((name, options) => {
//     console.log(`工程${name}创建中`);
//     console.log(options);
//   });

program.parse(process.argv);

program.outputHelp();

console.log(program.opts().envName);
