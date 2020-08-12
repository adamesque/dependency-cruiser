const chalk = require("chalk");
const figures = require("figures");
const bus = require("../../utl/bus");

module.exports = function setUpCliFeedbackListener(
  pMaxLogLevel = bus.levels.SUMMARY
) {
  const lStream = process.stderr;

  bus.on("progress", (pMessage, pLevel = bus.levels.SUMMARY) => {
    if (pLevel <= pMaxLogLevel) {
      lStream.clearLine(1);
      lStream.write(`  ${chalk.greenBright(figures.play)} ${pMessage}...\n`);
      lStream.moveCursor(0, -1);
    }
  });

  bus.on("write-start", () => {
    lStream.moveCursor(0, 0);
    lStream.clearLine(1);
  });
};
