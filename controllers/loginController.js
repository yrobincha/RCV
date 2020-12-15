import { config } from "../config";
import { nanoid } from "nanoid";
import projectManager from "../models/projectManager";
const fs = require("fs");
const path = require("path");
var ffmpeg = require("fluent-ffmpeg");

const User = require("../models/users");
const Project = require("../models/projects");

exports.login = (req, res) => {
  User.findOne({ userID: req.body.userID }, (err, user) => {
    if (!user) {
      var newUser = new User();
      newUser.userID = req.body.userID;
      newUser.name = req.body.name;
      newUser.save(() => {
        res.json({ result: 1 });
      });
    } else {
      Project.find({ projectID: { $in: user.projectIDs } }, (err, project) => {
        if (!project) {
        } else {
          res.json(project);
        }
      });
    }
  });
  req.session.userID = req.body.userID;
  req.session.name = req.body.name;
  console.log(req.session);
};

exports.projectPOST = (req, res, next) => {
  var sess;
  sess = req.session;

  let projectID = nanoid(32);
  fs.mkdir(
    path.join(config.projectPath, projectID),
    { recursive: true },
    (err) => {
      if (err) return next(err);

      var newProject = new Project();
      newProject.projectID = projectID;
      newProject.name = req.body.projectName;
      newProject.save();

      User.updateOne(
        { userID: sess.userID },
        { $push: { projectIDs: projectID } },
        (err, user) => {
          if (err) return console.log("error");
          console.log("projectID added");
        }
      );
      projectManager.save(projectID, projectManager.init()).then(
        () => res.json({ project: projectID }),
        (err) => next(err)
      );
    }
  );
  //console.log(sess);
};

exports.projectsGET = (req, res) => {
  User.findOne({ userID: req.session.userID }, (err, user) => {
    if (err) console.log("no user");
    if (!user) {
      res.json({});
    } else {
      Project.find({ projectID: { $in: user.projectIDs } }, (err, project) => {
        if (!project) {
          res.json({});
        } else {
          res.json(project);
        }
      });
    }
  });
};

var zero = function (n, digits) {
  var z = "";
  n = n.toString();
  var i = 0;
  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) z += "0";
  }

  return z + n;
};

exports.thumbnailPOST = (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  let date = new Date(req.body.time);
  let mm = zero(date.getMinutes(), 2);
  let ss = zero(date.getSeconds(), 2);
  let ms = zero(date.getMilliseconds(), 3);
  let timestamp = mm + ":" + ss + "." + ms;
  let filter = req.body.filter;
  let subtitle = null;
  let fontcolor = null;
  let size = null;

  if(filter.service === 'text'){
    subtitle = filter.properties[0].value;
    fontcolor = filter.properties[2].value;
    size = filter.properties[3].value;
  }

  var video = path.join(
    __dirname,
    "..",
    "WORKER",
    req.body.projectID,
    req.body.resource + ".mp4"
  );
  var filename = 'thumbnail-' + req.body.resource + ".png";
  var outputPath = path.join('public/images/', filename)

  var options = [
    '-s 320x240',
    '-frames', '1',
  ];

  if(subtitle) 
  options.push(`-filter:v drawtext=text=${subtitle}':x=w*0.3:y=h*0.8:fontsize=${size}:fontcolor=${fontcolor}`)
 

  ffmpeg(video)
    .seekInput(timestamp)
    .output(outputPath)
    .outputOptions(options)
    .on('end', function () {
      return res.json({
        success: true,
        thumbsFilePath: filename,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .run()
};
