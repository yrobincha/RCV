import React, { Component } from "react";
import Modal from "react-modal";
import filters from "../filters";
import AddFilterDialog from './AddFilterDialog';
import timeManager from "../../models/timeManager";
import { server } from "../../config";
import PropTypes from "prop-types";

Modal.setAppElement(document.body);

export default class AddTextDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "text",
      text: 100, // Must match default value of first filter in /react/filters.js
      color : "white",
      size : 32
    };

    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleDelFilter = this.handleDelFilter.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  render() {
    const item = this.props.getItem(this.props.item);

    return (
      <div>
        <Modal
          isOpen={true}
          contentLabel="새 자막 추가"
          className={"modal"}
          overlayClassName={"overlay"}
          onRequestClose={this.handleCloseDialog}
        >
          <h2>자막</h2>
          <div>
            <table>
              <tbody>
                {item.filters.length === 0 && (
                  <tr>
                    <td>자막 없음</td>
                  </tr>
                )}
                {item.filters.map((filter) => (
                  <tr key={filter.service}>
                    <td>{AddTextDialog.getFilter(filter.service).title}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelFilter(filter.service)}
                      >
                        <i className="material-icons" aria-hidden="true">
                          delete
                        </i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {item.filters.length === 0 && (
            <h3>새 자막 추가</h3>
          )}
          <div>
            <form onSubmit={this.handleAddFilter}>
              <label htmlFor={"filter"}>자막: </label>

              <br />
              <>
                <label htmlFor={"text"}>입력: </label>
                <input
                  type={"text"}
                  name={"text"}
                  defaultValue={""}
                  required={true}
                  title={"자막"}
                  onChange={this.handleLevelChange}
                />
              </>
              <br />
              <>
                <label htmlFor={"size"}>크기: </label>
                <input
                  type={"range"}
                  name={"size"}
                  min={0}
                  max={200}
                  id={"fontsize"}
                  defaultValue={100}
                  onChange={this.handleSizeChange}
                />
                <output name="fonts" for="fontsize"></output>
                <span> {this.state.level} %</span>
              </>
              <br/>
              <>
                <label htmlFor={"color"}>색상: </label>
                <input
                  type={"color"}
                  name={"color"}
                  value="#000000"
                  onChange={this.handleColorChange}
                />

                <span> {this.state.level} %</span>
              </>
              <br />
              <input type={"submit"} value={"자막 추가"} />
              <button onClick={this.handleCloseDialog}>닫기</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }

  handleFilterChange(event) {
    this.setState({ filter: event.target.value });
  }

  handleLevelChange(event) {
    this.setState({ text: event.target.value });
  }

  handleColorChange(event) {
    this.setState({ color: event.target.value });
  }

  handleSizeChange(event) {
    this.setState({ size: event.target.value });
  }

  handleCloseDialog() {
    this.setState({
      filter: filters.videoFilters[0].id,
      text: "", // Must match default value of first filter in /react/filters.js
    });
    this.props.onClose();
  }

  handleAddFilter(event) {
    event.preventDefault();

    let filter = AddTextDialog.getFilter(this.state.filter);

    let newFilter = {
      filter: this.state.filter,
      params: {},
    };
    const input = {};

    const item = this.props.getItem(this.props.item).item;
    const itemPath = this.props.item.split(":");
    newFilter.track = itemPath[0];
    newFilter.item = Number(itemPath[1]);
    
    
    for (let output of filter.out) {
      input[filter.in[0].id] = this.state.text;
      input[filter.in[0].size] = this.state.size;
      input[filter.in[0].color] = this.state.color;
      newFilter.params[output.id] = output.value(input, item);
    }
    console.log(newFilter)
    this.props.onAdd(newFilter);
  }

  handleDelFilter(filterId) {
    const itemPath = this.props.item.split(":");
    const url = `${server.apiUrl}/project/${this.props.project}/filter`;
    const bodyParams = {
      track: itemPath[0],
      item: Number(itemPath[1]),
      filter: filterId,
    };
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          this.props.onDel(bodyParams);
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.props.fetchError(error.message));
  }

  /**
   * Get filter object form config by its ID.
   *
   * @param {string} id
   * @return {Object|null}
   */
  static getFilter(id) {
    return filters.textFilters;
  }
}

AddTextDialog.propTypes = {
  item: PropTypes.string.isRequired,
  getItem: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
  fetchError: PropTypes.func.isRequired,
};
