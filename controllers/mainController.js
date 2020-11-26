import { config } from "../config";
const fs = require("fs");
const path = require("path");

exports.main = (req, res) => {
  if (req.session.num === undefined) {
    req.session.num = 1;
  }
  else {
    req.session.num = req.session.num + 1;
  }
  console.log(req.session.num)
  res.render("main", {})
};
exports.project = (req, res) => res.render("project", {});

exports.finished = (req, res) => {
  const outputFile = path.resolve(
    path.join(config.projectPath, req.params.projectID, "output.mp4")
  );
  fs.access(outputFile, fs.constants.R_OK, (err) => {
    if (err) {
      res.sendStatus(404);
    } else res.sendFile(outputFile);
  });
};
