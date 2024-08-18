// env
require("dotenv").config();

// import modules
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

// express app
const app = express();

// Start socket.io
const http = require("http");
const server = http.createServer(app);
require("./app/socket/socket").init(server);

// default middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Server is running");
});

//routes
app.use("/api/v1/status", require("./app/routes/status.routes"));

// listen server
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
