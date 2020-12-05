import React, { Component } from "react";
import TimelineModel from "./TimelineModel";
import LoadingDialog from "./LoadingDialog";
import SubmitDialog from "./SubmitDialog";
import Sources from "./Sources";
import Timeline from "./Timeline";
import { server } from "../../config";
import FetchErrorDialog from "./FetchErrorDialog";
import SubmitToolbar from "./SubmitToolbar";
import Preview from "./Preview";
import timeManager from "../../models/timeManager";
import { io } from "socket.io-client";
import InviteDialog from "./InviteDialog";
import LoginByInviteModal from "./LoginByInviteModal";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.loadData = this.loadData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.addResource = this.addResource.bind(this);
    this.delResource = this.delResource.bind(this);
    this.putResource = this.putResource.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.delFilter = this.delFilter.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.openSubmitDialog = this.openSubmitDialog.bind(this);
    this.closeSubmitDialog = this.closeSubmitDialog.bind(this);
    this.openFetchErrorDialog = this.openFetchErrorDialog.bind(this);
    this.closeFetchErrorDialog = this.closeFetchErrorDialog.bind(this);
    this.startProcessing = this.startProcessing.bind(this);
    this.play = this.play.bind(this);
    this.playing = this.playing.bind(this);
    this.pause = this.pause.bind(this);
    this.setTime = this.setTime.bind(this);

    this.datetimeStart = new Date(1970, 0, 1);
    this.timerStart = new Date(1970, 0, 1);
    this.timerFunction = null;
    this.socket = io();
    this.socket.on("userJoin", (data) => {
      if (data !== null) {
      }
    });
    this.socket.on("userList", (data) => {
      this.setState({ userList: data });
      console.log(this.state.userList);
      //this.state.userList.forEach((user) => console.log(user));
    });
    this.socket.on("load", (data) => {
      this.socket.emit("receive", { id: data.id, time: this.state.time });
    });
    this.socket.on("receive", (data) => {
      this.setState({ time: new Date(data.time) });
    });
    this.socket.on("reload", (data) => {
      if (this.socket.id != data.id) {
        //console.log(this.socket.id + ' !=  ' + data.id);
        this.setState({ req: true, time: new Date(data.time) });
        this.loadData();
      }
    });
    this.socket.on("reload complete", (data) => {
      this.setState({ req: false });
    });

    this.state = {
      id: null,
      req: false,
      project: window.location.href.match(/project\/([^/]*)/)[1],
      resources: {},
      timeline: {},
      processing: null,
      loading: true,
      showSubmitDialog: false,
      showFetchError: false,
      fetchError: "",
      time: new Date(1970, 0, 1),
      playing: false,
      userList: [],
      init: false,
      thumbnail: null,
      thumbnailHash: new Date(1970, 0, 1),
      editing: false,
      rendering: false,
      logged: false,
      isModalOpen: false,
    };

    this.loadData();
  }

  componentDidMount() {
    const wid = window.localStorage.getItem("id");
    if (wid) {
      console.log(wid);
      this.setState({
        logged: true,
      });
    } else {
      console.log("not logged in");
    }
  }

  render() {
    const userList = this.state.userList.map((user) => (
      <div key={user}>{user}</div>
    ));

    return (
      <>
        <header>
          {this.state.loading && <LoadingDialog />}
          {this.state.showSubmitDialog && (
            <SubmitDialog
              project={this.state.project}
              onClose={this.closeSubmitDialog}
              onProcessing={this.startProcessing}
              fetchError={this.openFetchErrorDialog}
            />
          )}
          {this.state.showFetchError && (
            <FetchErrorDialog
              msg={this.state.fetchError}
              onClose={this.closeFetchErrorDialog}
            />
          )}
          <a href={"/"}>
            <button className="error">
              <i className="material-icons" aria-hidden="true">
                arrow_back
              </i>
              편집 취소
            </button>
          </a>
          <div className="divider" />
          <h1 className={"project-name"}>Project Name</h1>
          {userList}
          <InviteDialog
            project={this.state.project}
            openModal={this.openModal}
            closeModal={this.closeModal}
            isModalOpen={this.state.isModalOpen}
          />
          <SubmitToolbar
            openSubmitDialog={this.openSubmitDialog}
            progress={this.state.processing}
            project={this.state.project}
          />
        </header>
        <main>
          {this.state.logged ? null : (
            <LoginByInviteModal onLogin={this.onLogin} />
          )}
          <div>
            <Sources
              project={this.state.project}
              items={this.state.resources}
              onAddResource={this.addResource}
              onDelResource={this.delResource}
              onPutResource={this.putResource}
              fetchError={this.openFetchErrorDialog}
            />
            <Preview
              editing={this.state.editing}
              thumbnail={this.state.thumbnail}
              thumbnailHash={this.state.thumbnailHash}
              items={this.state.timeline}
              time={this.state.time}
              playing={this.state.playing}
              pause={this.pause}
              play={this.play}
              setTime={this.setTime}
              rendering={this.state.rendering}
            />
          </div>
        </main>
        <footer>
          <Timeline
            resources={this.state.resources}
            items={this.state.timeline}
            project={this.state.project}
            onAddFilter={this.addFilter}
            onDelFilter={this.delFilter}
            loadData={this.loadData}
            fetchError={this.openFetchErrorDialog}
            time={this.state.time}
            setTime={this.setTime}
            renderVideo={this.renderVideo}
          />
        </footer>
      </>
    );
  }

  onLogin() {
    this.setState({
      logged: true,
    });
    console.log("logged in");
  }

  openModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  loadData() {
    const url = `${server.apiUrl}/project/${this.state.project}`;
    const params = {
      method: "GET",
    };
    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          if (data.processing !== null) setTimeout(this.loadData, 5000);
          if (this.state.processing !== null && data.processing === null) {
            data.processing = 100;
            this.setState({ rendering: false });
          }
          this.setState({
            id: data.project,
            resources: data.resources,
            timeline: data.timeline,
            processing: data.processing,
            loading: false,
          });
          if (!this.state.init) {
            this.socket.emit("addMember", {
              name: data.name,
              projectID: this.state.id,
            });
            this.state.init = true;
          } else {
            if (!this.state.req) {
              this.setState({ req: true });
              this.socket.emit("reload", {
                projectID: this.state.id,
                time: this.state.time,
              });
            }
            this.socket.emit("reload complete", this.state.id);
          }
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  }

  renderVideo() {
    this.setState({ rendering: true });
    const url = `${server.apiUrl}/project/${this.state.project}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          this.startProcessing();
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.props.fetchError(error.message));
  }

  addResource(resource) {
    const resources = Object.assign({}, this.state.resources);
    resources[resource.id] = resource;
    this.setState({ resources: resources });
    console.log(this.state.resources);
    this.loadData();
  }

  delResource(id) {
    const resources = Object.assign({}, this.state.resources);
    delete resources[id];
    this.setState({ resources: resources });
    this.loadData();
  }

  putResource(id, duration, trackId) {
    const timeline = Object.assign({}, this.state.timeline);
    const track = TimelineModel.findTrack(timeline, trackId);
    const trackLength = track.items.length;
    if (duration === null) duration = this.state.resources[id].duration;
    const timeEnd = timeManager.addDuration(track.duration, duration);

    track.items.push({
      resource: id,
      in: "00:00:00,000",
      out: duration,
      start: track.duration,
      end: timeEnd,
      filters: [],
      transitionTo: null,
      transitionFrom: null,
    });
    track.duration = timeEnd;
    this.setState({ timeline: timeline });
    this.loadData();
    if (trackLength === 0) {
      this.addTrack(trackId.includes("audio") ? "audio" : "video");
    }
  }

  addTrack(type) {
    const url = `${server.apiUrl}/project/${this.state.project}/track`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
      }),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err !== "undefined") {
          alert(`${data.err}\n\n${data.msg}`);
        }
        this.loadData();
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  }

  addFilter(parameters) {
    const url = `${server.apiUrl}/project/${this.state.project}/filter`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          const timeline = Object.assign({}, this.state.timeline);
          const track = TimelineModel.findTrack(timeline, parameters.track);
          const item = TimelineModel.findItem(track.items, parameters.item);

          item.filters.push({ service: parameters.filter });
          this.setState({ timeline: timeline });
          this.loadData();
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  }

  delFilter(parameters) {
    const timeline = Object.assign({}, this.state.timeline);
    const track = TimelineModel.findTrack(timeline, parameters.track);
    const item = TimelineModel.findItem(track.items, parameters.item);

    item.filters = item.filters.filter(
      (filter) => filter.service !== parameters.filter
    );
    this.setState({ timeline: timeline });
    this.loadData();
  }

  openSubmitDialog() {
    this.setState({ showSubmitDialog: true });
  }

  closeSubmitDialog() {
    this.setState({ showSubmitDialog: false });
  }

  /**
   * Show Connection error dialog
   *
   * @param {String} msg
   */
  openFetchErrorDialog(msg) {
    this.setState({
      showFetchError: true,
      fetchError: msg,
    });
  }

  /**
   * Close Connection error dialog
   */
  closeFetchErrorDialog() {
    this.setState({
      showFetchError: false,
      fetchError: "",
    });
  }

  /**
   * Start fetching processing state
   */
  startProcessing() {
    if (this.state.processing === null || this.state.processing === 100) {
      this.setState({ processing: 0 });
    }
    setTimeout(this.loadData, 5000);
  }

  play() {
    this.datetimeStart = new Date();
    this.timerStart = this.state.time;
    this.setState({ playing: true });
    this.timerFunction = setInterval(this.playing, 33);
  }

  playing() {
    this.setState({
      playing: true,
      time: new Date(
        this.timerStart.getTime() + Date.now() - this.datetimeStart.getTime()
      ),
    });
  }

  pause() {
    clearInterval(this.timerFunction);
    this.playing();
    this.setState({ playing: false });
  }

  setTime(time) {
    if (this.timerFunction !== null || this.state.playing) {
      clearInterval(this.timerFunction);
      this.setState({ playing: false });
    }

    if (!this.state.req) {
      this.setState({ req: true });
      this.socket.emit("reload", { projectID: this.state.id, time: time });
    }
    this.socket.emit("reload complete", this.state.id);

    const url = `${server.apiUrl}/project/${this.state.project}/thumbnail`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource: this.state.resources,
        projectID: this.state.project,
        time: time,
      }),
    };
    if (Math.abs(time.getTime() - this.state.time.getTime()) >= 100) {
      fetch(url, params)
        .then((response) => response.json())
        .then((data) => {
          if (typeof data.err !== "undefined") {
            alert(`${data.err}\n\n${data.msg}`);
          }
          this.setState({
            thumbnail: "/images/" + data.thumbsFilePath,
            thumbnailHash: Date.now(),
          });
          console.log(this.state.thumbnail);
          this.loadData();
        })
        .catch((error) => this.openFetchErrorDialog(error.message));
    }
    this.setState({ editing: true, time: time });
    // this.socket.emit('reload', this.state.id);
  }
}
