const si = require("systeminformation");

const diskStatus = async (req, res, next) => {
  const valueObject = {
    diskLayout: "device,type,name,size",
    fsSize: "fs,type,size,used,available,use",
  };
  try {
    const state = await si.get(valueObject);

    console.log(state);

    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { diskStatus };
