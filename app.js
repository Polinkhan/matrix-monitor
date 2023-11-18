//Dependendies
const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
require("dotenv").config();

//app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/testConnection", async (req, res) => {
  res.status(200).send(true);
});

// Base Routes
app.use("/api/v1/cmd", require("./routes/routes.cmd"));
app.use("/api/v1/status", require("./routes/routes.status"));

//listen app
app.listen(25125, () => console.log("listening on port 25125"));
