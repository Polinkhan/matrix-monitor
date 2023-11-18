const { exec } = require("child_process");

const Power = async (req, res, next) => {
  try {
    const { cmd } = req.body;
    exec(CMD.linux[cmd], () => {
      res.send();
    });
    res.send();
  } catch (err) {
    console.log(err);
  }
};

const CMD = {
  linux: {
    shutdown: "shutdown now",
    reboot: "reboot",
    lock: "dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock",
  },
};

module.exports = { Power };
