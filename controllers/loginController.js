import { config } from "../config";
import { nanoid } from "nanoid";
import projectManager from "../models/projectManager";
const fs = require("fs");
const path = require("path");

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
  console.log(sess);
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
