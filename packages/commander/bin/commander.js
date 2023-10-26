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

function buildServiceCommand() {
  const service = new Command('service');
  service.command('start <name>').action((name, options) => {
    console.log(`${name}已被开启`);
  });
  service
    .command('stop [name]', '关闭一个具名服务或者关闭所有服务')
    .action((name) => {
      if (name) {
        console.log(`${name}已被关闭`);
      } else {
        console.log('所有服务都终止了');
      }
    });
  return service;
}

// 添加子命令
program.addCommand(buildServiceCommand());

// <>代表必传，[] 代表可选参数
// program
//   .command('create')
//   .description('创建工程')
//   .argument('<name>', '工程名')
//   .action((name, options) => {
//     console.log(`工程${name}创建中`);
//     console.log(options);
//   });
// 如何实现自定义 help 信息
// program.outputHelp();
program.helpInformation = function () {
  return '';
};

program.on('--help', function () {
  console.log('your help information');
});
// 高级定制2 实现 debug 模式
program.on('option:debug', () => {
  console.log('debug', program.debug);
  if (program.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  console.log(process.env.LOG_LEVEL);
});

// 高级定制3 ，对未知命令的监听
program.on('command:*', (obj) => {
  console.error('未知命令' + obj[0]);
  const availableCommands = program.commands.map((cmd) => cmd.name());
  console.log(` 可用命令为： ${availableCommands.toString()}`)
  
});

program.parse(process.argv);

// program.outputHelp();
