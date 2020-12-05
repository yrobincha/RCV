import React, { useEffect, useState } from "react";
import { server } from "../../config";
import axios from "axios";

const CreateNewProject = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    axios.get("/api/projects", {}).then((res) => {
      setProjects(res.data);
    });
  }, []);

  const createProject = (projectName) => {
    const data = { projectName: projectName };
    const url = `${server.apiUrl}/project`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          window.location = `${server.serverUrl}/project/${data.project}`;
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  };

  const handleChange = (event) => {
    setNewProject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newProject !== "") {
      createProject(newProject);
    }
  };

  const navigateToProject = (projectID) => {
    window.location = `${server.serverUrl}/project/${projectID}`;
  };

  return (
    <div className={"create-new-project"}>
      <div className={"container"}>
        <h1 className={"title"}>Projects</h1>
        <div>
          {projects ? (
            projects.map((project) => (
              <button
                key={project.projectID}
                onClick={() => navigateToProject(project.projectID)}
              >
                {project.name}
              </button>
            ))
          ) : (
            <p className={"content"}>
              진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <label>
              이름:
              <input type="text" value={newProject} onChange={handleChange} />
            </label>
            <input
              type="submit"
              value="Create Project"
              id={"create-project-button"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProject;
