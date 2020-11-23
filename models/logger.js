const log4js = require("log4js");
const logger = log4js.getLogger();
log4js.configure({
  appenders: {
    everything: {
      type: "file",
      filename: "server.log",
      maxLogSize: 10485760,
      keepFileExt: true,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" },
  },
});

export default logger;
