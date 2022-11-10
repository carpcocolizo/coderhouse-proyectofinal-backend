import os from "os";
import util from "util";
import config from "../src/config/config.js";

const cpus = os.cpus();
const info = {
  port: config.port,
  path: process.execPath,
  os: process.platform,
  processid: process.pid,
  nodev: process.version,
  folder: process.cwd(),
  memoria: util.inspect(process.memoryUsage()),
  procesadores: cpus.length,
};

const getInfo = (req, res) => {
  res.render("info.hbs", { info });
};

export { getInfo };
