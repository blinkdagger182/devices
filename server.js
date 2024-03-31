const fs = require("fs");
const express = require("express");

const app = express();

app.use(cors())
app.use(express.json())

const jsonFilePath = "./devices.json";

// Serve the static JSON file
app.get("/devices", function (req, res) {
  res.sendFile(jsonFilePath, { root: __dirname });
});

// Start the server
app.listen(3000, function () {
  console.log(`Server is running`);
});
