import React, { Component } from "react";
import { server } from "../../config";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { newProject: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToProject = this.navigateToProject.bind(this);
  }

  handleChange(event) {
    this.setState({ newProject: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create(this.state.newProject);
  }

  navigateToProject(projectID) {
    window.location = `${server.serverUrl}/project/${projectID}`;
  }

  render() {
    const { isOpen, close, create, projects } = this.props;
    return (
      <>
        {isOpen ? (
          <div id={"modal"}>
            <div>
              <h1 className={"title"}>Projects</h1>
              <div>
                {projects ? (
                  projects.map((project) => (
                    <button
                      key={project.projectID}
                      onClick={() => this.navigateToProject(project.projectID)}
                    >
                      {project.name}
                    </button>
                  ))
                ) : (
                  <p>
                    진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.
                  </p>
                )}
              </div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  이름:
                  <input
                    type="text"
                    value={this.state.newProject}
                    onChange={this.handleChange}
                  />
                </label>
                <input
                  type="submit"
                  value="Add Project"
                  id={"create-project-button"}
                />
              </form>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default SignIn;
