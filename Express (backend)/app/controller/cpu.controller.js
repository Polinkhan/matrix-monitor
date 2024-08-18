// import module
const si = require("systeminformation");

// VARIABLES
const valueObject = {
  cpu: "manufacturer,brand,speedMin,speed,speedMax,cores",
  cpuCurrentSpeed: "avg,min,max,cores",
  cpuTemperature: "main",
  currentLoad: "currentLoad,cpus",
};

const getCpuStatus = async () => {
  return await si.get(valueObject);
};

const cpuStatus = async (req, res, next) => {
  try {
    const state = await getCpuStatus();
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { cpuStatus, getCpuStatus };
