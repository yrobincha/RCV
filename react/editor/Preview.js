import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.state = {
      playing: false,
    };
  }

  render() {
    return (
      <div id="preview">
        <h3>
          <i className="material-icons" aria-hidden={true}>
            {" "}
            movie_filter{" "}
          </i>
          미리보기
        </h3>
        <div>
          {this.props.editing && (
            <img src={`${this.props.thumbnail}?${this.props.thumbnailHash}`} />
          )}
        </div>
        {typeof this.props.items.video !== "undefined" &&
        !this.props.rendering ? (
          <ReactPlayer
            url={`${window.location.href}/output.mp4`}
            playing={this.state.playing}
          />
        ) : (
          <ReactPlayer url={""} playing={false} />
        )}
        <br />
        <div className="prev-toolbar">
          <button onClick={this.stop} className="no-border" title="재생 중지">
            <i className="material-icons" aria-hidden="true">
              stop
            </i>
          </button>
          {this.props.playing ? (
            <button onClick={this.pause} title="재생 일시 중지">
              <i className="material-icons" aria-hidden="true">
                pause
              </i>
            </button>
          ) : (
            <button onClick={this.play} title="계속 재생">
              <i className="material-icons" aria-hidden="true">
                play_arrow
              </i>
            </button>
          )}
        </div>
      </div>
    );
  }

  stop() {
    this.props.setTime(new Date(1970, 0, 1));
  }

  play() {
    this.setState({
      playing: true,
    });
    this.props.play();
  }

  pause() {
    this.setState({
      playing: false,
    });
    this.props.pause();
  }
}

Preview.propTypes = {
  items: PropTypes.object.isRequired,
  time: PropTypes.object.isRequired,
  playing: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
};
