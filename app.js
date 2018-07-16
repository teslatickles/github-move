#!/usr/bin/env node

'use strict'

const chalk = require('chalk');
const log = console.log;
const error = console.error;

let operatingSys = '' || 'ls /dev/';

if (process.platform === 'darwin') {
  log(chalk.rgb(125, 125, 175)('\n must be on a mac\n'));
  operatingSys = "osascript -e 'tell application \"Finder\" to eject \
                 (every disk whose ejectable is true)'";
} else if (process.platform === 'linux') {
    log(chalk.rgb(200, 100, 150)('\nmust be on a linux machine\n'));
    operatingSys = "sudo umount /dev/sd* --verbose";
} else if (process.platform === 'win32') {
    throw error(chalk.rgb(250, 50, 88)('\nOh no! must you use windows? : \
    would you help me make this work for windows... please 貴方わすごいです！\n'));
}

const { exec } = require('child_process');
const child = exec(operatingSys);

child.stderr.on('data', (data) => {
  error(chalk.redBright(data));
});

child.on('exit', function (code, signal) {
  log(chalk.bold.hex('4271f4')('\n All devices ejected! \n'));
});
