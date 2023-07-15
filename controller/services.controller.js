const si = require("systeminformation");

const serviceStatus = async (req, res, next) => {
  try {
    const { text } = req.body;
    const state = await si.processLoad(text);
    console.log(state);
    res.send(state);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { serviceStatus };
