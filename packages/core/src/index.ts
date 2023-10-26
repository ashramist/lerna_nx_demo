import { homedir } from 'node:os';
import { spawn } from 'node:child_process';
import path from 'node:path';
import semver from 'semver';
import { config } from 'dotenv';
import minimist from 'minimist';
import colors from 'colors';
import log from '@wawj/utils';
import { Command } from 'commander';
import pkg from '../package.json';

const program = new Command();
module.exports = function (argv: string[]) {
  return new Initialzer(argv);
};

// 准备阶段处理
class Initialzer {
  constructor(argv: string[]) {
    try {
      this.checkUserInput(argv);
      this.checkPkgVersion();
      this.checkNodeVersion();
      this.checkUserHome();
      this.checkEnv();
      // this.checkIsLatest();
      this.registerCommands();
    } catch (err) {
      console.log(err);
    }
  }
  // 版本版本号
  checkPkgVersion() {
    log.info('cli', pkg.version);
  }
  //  node版本检查
  checkNodeVersion() {
    const version: string = process.version;
    if (!semver.satisfies(version, pkg.engines.node)) {
      throw new Error(
        colors.red(`您当前node版本过低,支持范围为${pkg.engines.node}`)
      );
    }
  }

  // 检查用户主目录
  checkUserHome() {
    console.log(homedir());
  }
  // 检查环境变量
  checkEnv() {
    const envConfig = config({
      path: path.resolve(__dirname, '../core/.env'),
      encoding: 'utf8', // 编码方式，默认utf8
      debug: false, // 是否开启debug，默认false
    });
    if (!envConfig) {
      console.log('配置文件不存在');
    } else {
      console.log(envConfig);
    }
  }
  // 检查用户入参
  checkUserInput(argv: string[]) {
    const inputParams = minimist(argv);
    if (inputParams.debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
  }

  // 检查是否是最新版本
  checkIsLatest() {
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const subProcess = spawn(command, ['view', pkg.name, 'version']);
    subProcess.stdout.on('data', (data) => {
      const version = Buffer.from(data).toString('utf-8');
      if (semver.lt(pkg.version, version)) {
        log.warn(
          colors.yellow(`请手动更新npm包 ${pkg.name}`),
          `当前版本:${pkg.version}`,
          `最新版本:${colors.yellow(version)}${colors.red(
            `更新命令:npm install ${pkg.name}@latest`
          )}
          `
        );
      }
    });
    subProcess.stderr.on('data', (data) => {
      log.error('stderr', `${data}`);
    });

    subProcess.on('close', (code) => {
      log.info('std close', `子进程退出码：${code}`);
    });
  }
  // 注册命令
  registerCommands() {
    program
      .name(Object.keys(pkg.bin)[0]) // 定义模板名称
      .version(pkg.version)
      .option('-d,--debug', '开启调试模式')
      .option('-h,--help', '帮助');

    program.parse(process.argv);
    program.outputHelp();
  }
}
