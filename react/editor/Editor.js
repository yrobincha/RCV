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
import { io } from 'socket.io-client';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
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
    this.socket.on('userJoin', (data) => {
      console.log( data + ' joined ');
    });
    this.socket.on('userList', (data) => {
      console.log( data );
    });
    this.socket.on('reload', (data) => {
      console.log( data + "reload!" );
      this.loadData();
    });
     
    
    this.state = {
      id : null,
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
    };

    this.loadData();

  }
  
  render() {
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
          <SubmitToolbar
            openSubmitDialog={this.openSubmitDialog}
            progress={this.state.processing}
            project={this.state.project}
          />
        </header>
        <main>
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
              items={this.state.timeline}
              time={this.state.time}
              playing={this.state.playing}
              pause={this.pause}
              play={this.play}
              setTime={this.setTime}
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
          />
        </footer>
      </>
    );
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
          if (this.state.processing !== null && data.processing === null)
            data.processing = 100;
          this.setState({
            id : data.project,
            resources: data.resources,
            timeline: data.timeline,
            processing: data.processing,
            loading: false,
          });
          console.log(this.state.id);
          this.socket.emit('addMember', { name: data.name, projectID: this.state.id});
          // rPthr 'addMember' emfdjrksmsrj tnwjdgodigka
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  }

  addResource(resource) {
    const resources = Object.assign({}, this.state.resources);
    resources[resource.id] = resource;
    this.setState({ resources: resources });
    this.socket.emit('reload', this.state.id);
  }

  delResource(id) {
    const resources = Object.assign({}, this.state.resources);
    delete resources[id];
    this.setState({ resources: resources });
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
    this.setState({ time: time });
  }
}
