import { homedir } from 'node:os';
import { spawn } from 'node:child_process';
import path from 'node:path';
import semver from 'semver';
import { config } from 'dotenv';
import log from 'npmlog';
import minimist from 'minimist';
import pkg from '../package.json';
module.exports = function (argv: string[]) {
  return new Initialzer(argv);
};

// 准备阶段处理
class Initialzer {
  constructor(argv: string[]) {
    this.checkPkgVersion();
    this.checkNodeVersion();
    this.checkUserHome();
    this.checkEnv();
    this.checkUserInput(argv);
    this.checkIsLatest();
  }
  // 版本版本号
  checkPkgVersion() {
    log.info('cli', pkg.version);
  }
  //  node版本检查
  checkNodeVersion() {
    const version: string = process.version;
    log.info('node', version);
  }

  // 检查用户主目录
  checkUserHome() {
    console.log(homedir());
  }
  // 检查用户入参
  checkUserInput(argv: string[]) {
    const inputParams = minimist(argv);
    console.log(inputParams);
    // if (inputParams.debug) {
    //   log.LOG_LEVEL = 'verbose';
    // } else {
    //   log.LOG_LEVEL = 'info';
    // }
  }

  // 检查环境变量
  checkEnv() {
    console.log(path.resolve(__dirname, '../core/.env'));
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

  // 检查是否是最新版本
  checkIsLatest() {
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const subProcess = spawn(command, ['view', pkg.name, 'version']);
    subProcess.stdout.on('data', (data) => {
      const version = Buffer.from(data).toString('utf-8');
      if (semver.lt(pkg.version, version)) {
        log.warn('warn', `当前版本过低，最新版本为${data}`);
      }
    });
    subProcess.stderr.on('data', (data) => {
      log.error('stderr', `${data}`);
    });

    subProcess.on('close', (code) => {
      log.info('std close', `子进程退出码：${code}`);
    });
  }
}
