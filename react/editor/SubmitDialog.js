import React, { Component } from "react";
import Modal from "react-modal";
import { server } from "../../config";
import PropTypes from "prop-types";

Modal.setAppElement(document.body);

export default class SubmitDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };

    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleSumbitDialog = this.handleSumbitDialog.bind(this);
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={true}
          contentLabel="project complete"
          className={"modal"}
          overlayClassName={"overlay"}
          onRequestClose={this.handleCloseDialog}
        >
          <h2>프로젝트 완료</h2>
          <div>
            <form onSubmit={this.handleSumbitDialog}>
              <label htmlFor={"email"}>이메일 주소: </label>
              <input
                type={"email"}
                name={"email"}
                required={true}
                size={30}
                value={this.state.email}
                onChange={this.handleEmailChanged}
              />
              <br />
              프로젝트의 처리 시간은 길이에 따라 다릅니다.
              <br />
              이메일을 입력하면 처리되는 즉시 결과 비디오에 대한 링크를
              보내드립니다.
              <br />
              <input type={"submit"} className={"success"} value={"시작"} />
              <button onClick={this.handleCloseDialog}>취소</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }

  handleCloseDialog() {
    this.setState({
      email: "",
    });
    this.props.onClose();
  }

  handleSumbitDialog(event) {
    event.preventDefault();

    const url = `${server.apiUrl}/project/${this.props.project}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          this.handleCloseDialog();
          this.props.onProcessing();
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.props.fetchError(error.message));
  }

  handleEmailChanged(event) {
    this.setState({
      email: event.target.value,
    });
  }
}

SubmitDialog.propTypes = {
  project: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchError: PropTypes.func.isRequired,
  onProcessing: PropTypes.func.isRequired,
};
