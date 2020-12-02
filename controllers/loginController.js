import { config } from "../config";
import { nanoid } from "nanoid";
import projectManager from "../models/projectManager";
const fs = require("fs");
const path = require("path");
var ffmpeg = require('fluent-ffmpeg');

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
    Project.find({ projectID: { $in: user.projectIDs } }, (err, project) => {
      if (!project) {
        res.json({});
      } else {
        res.json(project);
      }
    });
  });
};

var zero = function(n, digits) {
  var z = '';
  n = n.toString();
  var i = 0;
  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      z += '0';
  }

  return z + n;
}

exports.thumbnailPOST = (req, res) => {

  let thumbsFilePath = "";
  let fileDuration = "";
  let date = new Date(req.body.time);
  let mm = zero(date.getMinutes(),2);
  let ss = zero(date.getSeconds(),2);
  let ms = zero(date.getMilliseconds(),3);
  let timestamp = mm + ':' + ss + '.' + ms;
  //console.log(timestamp)
 
  var filename = null;
  var video = path.join(__dirname, '..', 'WORKER', req.body.projectID, Object.keys(req.body.resource)[0] + ".mp4");
  ffmpeg(video)
  .on("filenames", function (filenames) {
    //console.log("Will generate " + filenames.join(", "));
    thumbsFilePath = path.join("../public/images" , filenames[0]);
    filename = filenames[0];
  })
  .on("end", function () {
    //console.log("Screenshots taken");
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
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count : 1,
    timestamps : [timestamp],
    folder: "public/images",
    size: "320x200",
    // %b input basename ( filename w/o extension )
    filename: "thumbnail-%b.png",
  });


};

