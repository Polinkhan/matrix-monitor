// import module
const si = require("systeminformation");

// VARIABLES
const valueObject = {
  mem: "total,free,used,available,swaptotal,swapused,swapfree",
};

const getMemoryStatus = async () => {
  return await si.get(valueObject);
};

const memoryStatus = async (req, res, next) => {
  try {
    const state = await getMemoryStatus();
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { memoryStatus, getMemoryStatus };
