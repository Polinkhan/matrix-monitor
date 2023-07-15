const si = require("systeminformation");

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const cpuStatus = async (req, res, next) => {
  const valueObject = {
    cpu: "manufacturer,brand,speedMin,speed,speedMax,cores",
    cpuCurrentSpeed: "avg,min,max,cores",
    cpuTemperature: "main",
    currentLoad: "currentLoad,cpus",
    mem: "total,free,used,available,swaptotal,swapused,swapfree",
  };
  try {
    const state = await si.get(valueObject);
    console.log(state.mem);
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { cpuStatus };
