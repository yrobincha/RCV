import React, { Component } from "react";
import Modal from "react-modal";
import filters from "../filters";
import timeManager from "../../models/timeManager";
import { server } from "../../config";
import PropTypes from "prop-types";

Modal.setAppElement(document.body);

export default class AddTextDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: filters.videoFilters[0].id,
            level: 100,
            argument: null,
            size: 48
        };

        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleAddFilter = this.handleAddFilter.bind(this);
        this.handleDelFilter = this.handleDelFilter.bind(this);
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
                        <form>
                            <input type="text" id="name" name="name" size="10"/>
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
        this.setState({ level: event.target.value });
    }

    handleCloseDialog() {
        this.setState({
            filter: filters.videoFilters[0].id,
            level: 100, // Must match default value of first filter in /react/filters.js
        });
        this.props.onClose();
    }

    handleAddFilter(event) {
        event.preventDefault();

        let filter = AddFilterDialog.getFilter(this.state.filter);
        if (
            filter.in[0].id === "duration" &&
            !timeManager.isValidDuration(this.state.level)
        ) {
            alert("기간은 00:00:00,000 형식으로 0이 아니어야합니다.");
            return;
        }

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
            input[filter.in[0].id] = this.state.level;
            newFilter.params[output.id] = output.value(input, item);
        }

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
        for (let filter of filters.videoFilters) {
            if (filter.id === id) {
                return filter;
            }
        }
        for (let filter of filters.audioFilters) {
            if (filter.id === id) {
                return filter;
            }
        }
        return null;
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
