const si = require("systeminformation");

const getServiceStatus = async () => {
  const memory = (await si.get({ mem: "total" })).mem.total / (1024 * 1024);
  const state = await si.processes();

  const parrentPids = Array.from(new Set(state.list.map(({ parentPid }) => parentPid)));
  const parrentPidsData = {};
  parrentPids.forEach((pid) => (parrentPidsData[pid] = null));

  state.list.forEach(({ name, cpu, mem, pid, parentPid }) => {
    if (parrentPidsData[parentPid] === null) {
      parrentPidsData[parentPid] = { name, cpu, mem: (memory * mem) / 100 };
    } else {
      parrentPidsData[parentPid].cpu += cpu;
      parrentPidsData[parentPid].mem += (memory * mem) / 100;
    }
  });

  const response = Object.keys(parrentPidsData).map((pid) => ({ pid, ...parrentPidsData[pid] }));
  response.sort((a, b) => b.mem - a.mem); // Sorting in descending order of CPU usage
  return response;
};

const serviceStatus = async (req, res, next) => {
  try {
    const response = await getServiceStatus();
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { serviceStatus, getServiceStatus };
