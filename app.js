#!/usr/bin/env node

"use strict";

const { exec } = require("child_process");
const os = require("os");
const chalk = require("chalk");
const log = console.log;
const error = console.error;

let operatingSys = "" || "ls /dev/";

let userInfo = os.userInfo();
log(
  chalk.hex("#60a3bc")(`\nHello, ${chalk.hex("#e58e26")(userInfo.username)}`)
);

if (process.platform === "darwin") {
  log(chalk.hex("#1abc9c")("\nmust be on a mac\n"));
  operatingSys =
    "osascript -e 'tell application \"Finder\" to eject \
                 (every disk whose ejectable is true)'";
} else if (process.platform === "linux") {
  log(chalk.hex("#1abc9c")("\nmust be on a linux machine\n"));
  operatingSys = "sudo umount /dev/sd* --verbose";
} else if (process.platform === "win32") {
  throw error(
    chalk.hex("#1abc9c")(
      "\nOh no! must you use windows? : \
    would you help me make this work for windows... please 貴方わすごいです！\n"
    )
  );
}

const child = exec(operatingSys);

child.stderr.on("data", data => {
  error(chalk.redBright(data));
});

child.on("exit", function(code, signal) {
  log(chalk.bold.hex("#EE5A24")("ALL devices ejected! \n"));
});
