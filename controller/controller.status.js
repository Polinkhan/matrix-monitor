const si = require("systeminformation");

const Cpu = async (req, res, next) => {
  try {
    const state = await si.get(Information.Cpu);
    console.log(state);
    res.send(state);
  } catch (err) {
    res.send(err);
  }
};

const Memory = async (req, res, next) => {
  try {
    const state = await si.get(Information.Memory);
    res.send(state);
  } catch (err) {
    res.send(err);
  }
};

const Disk = async (req, res, next) => {
  try {
    const state = await si.get(Information.Disk);
    res.send(state);
  } catch (err) {
    res.send(err);
  }
};

const Network = async (req, res, next) => {
  try {
    const state = await si.get(Information.Network);
    res.send(state);
  } catch (err) {
    res.send(err);
  }
};

const Processes = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text) {
      const state = await si.processLoad(text);
      res.send(state);
    } else {
      const state = await si.processLoad("apache, mysql, node, docker, php");
      res.send(state);
    }
  } catch (err) {
    res.send(err);
  }
};

const Ping = async (req, res, next) => {
  res.send();
};

const Information = {
  Cpu: {
    cpu: "manufacturer,brand,speedMin,speed,speedMax,cores",
    cpuCurrentSpeed: "avg,min,max,cores",
    cpuTemperature: "main",
    currentLoad: "currentLoad,cpus",
  },
  Memory: {
    mem: "total,free,used,available,swaptotal,swapused,swapfree",
  },
  Disk: {
    diskLayout: "device,type,name,size",
    fsSize: "fs,type,size,used,available,use",
  },
  Network: {
    networkInterfaces: "ip4,ip6,mac,speed,type,iface",
    networkStats: "iface,rx_sec,tx_sec",
  },
};

module.exports = { Cpu, Memory, Disk, Network, Processes, Ping };
