const si = require("systeminformation");

const networkStatus = async (req, res, next) => {
  const valueObject = {
    networkInterfaces: "ip4,ip6,mac,speed,type,iface",
    networkStats: "iface,rx_sec,tx_sec",
  };
  try {
    const state = await si.get(valueObject);
    res.send(state);
    console.log(state.networkStats);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { networkStatus };
