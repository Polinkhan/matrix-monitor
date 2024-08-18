// import module
const si = require("systeminformation");

// VARIABLES
const valueObject = {
  networkInterfaces: "ip4,ip6,mac,speed,type,iface",
  networkStats: "iface,rx_sec,tx_sec",
};

const getNetworkStatus = async () => {
  const result = await si.get(valueObject);
  result.networkInterfaces = result.networkInterfaces.filter((network) => network.iface !== "lo");
  return result;
};

const networkStatus = async (req, res, next) => {
  try {
    const state = await getNetworkStatus();
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { networkStatus, getNetworkStatus };
