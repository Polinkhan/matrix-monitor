const { getCpuStatus } = require("../controller/cpu.controller");
const { getDiskStatus } = require("../controller/disk.controller");
const { getMemoryStatus } = require("../controller/memory.controller");
const { getNetworkStatus } = require("../controller/network.controller");
const { getServiceStatus } = require("../controller/services.controller");

// Listener list
SOCKET_CPU_LISTENER = "cpu";
SOCKET_DISK_LISTENER = "disk";
SOCKET_MEMORY_LISTENER = "memory";
SOCKET_NETWORK_LISTENER = "network";
SOCKET_SERVICE_LISTENER = "services";

// Emiter extention
SOCKET_STATUS_EMITTER_EXT = "_status";

const SOCKET_LISTENER_LIST = [
  {
    FUNC: getCpuStatus,
    LISTENER: SOCKET_CPU_LISTENER,
    INTERVAL: process.env.CPU_INTERVAL_SECOND,
    EMITTER: SOCKET_CPU_LISTENER + SOCKET_STATUS_EMITTER_EXT,
  },
  {
    FUNC: getMemoryStatus,
    LISTENER: SOCKET_MEMORY_LISTENER,
    INTERVAL: process.env.MEMORY_INTERVAL_SECOND,
    EMITTER: SOCKET_MEMORY_LISTENER + SOCKET_STATUS_EMITTER_EXT,
  },
  {
    FUNC: getNetworkStatus,
    LISTENER: SOCKET_NETWORK_LISTENER,
    INTERVAL: process.env.NETWORK_INTERVAL_SECOND,
    EMITTER: SOCKET_NETWORK_LISTENER + SOCKET_STATUS_EMITTER_EXT,
  },
  {
    FUNC: getDiskStatus,
    LISTENER: SOCKET_DISK_LISTENER,
    INTERVAL: process.env.DISK_INTERVAL_SECOND,
    EMITTER: SOCKET_DISK_LISTENER + SOCKET_STATUS_EMITTER_EXT,
  },
  {
    FUNC: getServiceStatus,
    LISTENER: SOCKET_SERVICE_LISTENER,
    INTERVAL: process.env.SERVICE_INTERVAL_SECOND,
    EMITTER: SOCKET_SERVICE_LISTENER + SOCKET_STATUS_EMITTER_EXT,
  },
];

module.exports = { SOCKET_LISTENER_LIST };
