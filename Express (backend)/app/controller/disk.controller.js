// import module
const si = require("systeminformation");

// VARIABLES
const valueObject = {
  diskLayout: "device,type,name,size",
  fsSize: "fs,type,size,used,available,use",
};

const getDiskStatus = async () => {
  return await si.get(valueObject);
};

const diskStatus = async (req, res, next) => {
  try {
    const state = await getDiskStatus();
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { diskStatus, getDiskStatus };
