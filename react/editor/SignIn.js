import React, { Component } from "react";
import { create } from "../../models/users";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create(this.state.value);
  }

  render() {
    const { isOpen, close, create } = this.props;
    return (
      <>
        {isOpen ? (
          <div id={"modal"}>
            <div>
              <h1 className={"title"}>Projects</h1>
              <p>
                진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.
              </p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  이름:
                  <input
                    type="text"
                    value={this.state.value}
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
