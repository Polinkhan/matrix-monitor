//Dependendies
const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
require("dotenv").config();

//Scafolding
const cpuRoute = require("./routes/cpu.routes");
const diskRoute = require("./routes/disk.routes");
const networkRoute = require("./routes/network.routes");
const serviceRoute = require("./routes/services.routes");

//app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//test Connection
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

app.get("/testConnection", async (req, res) => {
  await delay(1000);
  res.status(200).send(true);
});

//routes
app.use("/api/v1/cpu", cpuRoute);
app.use("/api/v1/disk", diskRoute);
app.use("/api/v1/network", networkRoute);
app.use("/api/v1/services", serviceRoute);

//listen app
app.listen(5000, () => console.log("listening on port 5000"));
