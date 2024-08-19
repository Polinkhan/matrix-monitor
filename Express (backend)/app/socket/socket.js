const { Server } = require("socket.io");
const { getCpuStatus } = require("../controller/cpu.controller");
const { getNetworkStatus } = require("../controller/network.controller");
const { getMemoryStatus } = require("../controller/memory.controller");
const { getDiskStatus } = require("../controller/disk.controller");
const { SOCKET_LISTENER_LIST } = require("../config/config");

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, { cors: { origin: "*" } });

    console.log("Socket connection established");

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      let interval_id;

      SOCKET_LISTENER_LIST.forEach(({ LISTENER, EMITTER, FUNC, INTERVAL }) => {
        socket.on(LISTENER, async () => {
          socket.emit(EMITTER, await FUNC());
          const callback = async () => socket.emit(EMITTER, await FUNC());
          interval_id = setInterval(callback, INTERVAL);
        });
      });

      socket.on("disconnect", () => {
        clearInterval(interval_id); // Stop the interval when client disconnects
        console.log("Client disconnected:", socket.id);
      });
    });

    return io;
  },
};
