const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jsonFilePath = "./devices.json";

// Serve the static JSON file
app.get("/devices", function (req, res) {
  res.sendFile(jsonFilePath, { root: __dirname });
});

// PATCH request to update an array in the JSON file
app.patch("/devices/:index", function (req, res) {
  const index = req.params.index;
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const devices = JSON.parse(data);
    if (index < 0 || index >= devices.length) {
      res.status(400).send("Invalid index");
      return;
    }
    devices[index] = req.body;
    fs.writeFile(jsonFilePath, JSON.stringify(devices, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Device updated successfully");
    });
  });
});

// DELETE request to delete an array from the JSON file
app.delete("/devices/:index", function (req, res) {
  const index = req.params.index;
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const devices = JSON.parse(data);
    if (index < 0 || index >= devices.length) {
      res.status(400).send("Invalid index");
      return;
    }
    devices.splice(index, 1);
    fs.writeFile(jsonFilePath, JSON.stringify(devices, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Device deleted successfully");
    });
  });
});

// Start the server
app.listen(3000, function () {
  console.log(`Server is running`);
});
