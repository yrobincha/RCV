import React, { Component } from "react";
import PropTypes from "prop-types";
import PreviewTrack from "./PreviewTrack";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.stop = this.stop.bind(this);
    this.state = {
      url: null,
    }
  }
  componentDidUpdate() {
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
          {
            this.props.editing && <img src={`${this.props.thumbnail}?${this.props.thumbnailHash}`}/>
          }
        </div>
        {typeof this.props.items.video !== "undefined" &&
          Object.keys(this.props.items.video).map((key) => (
            <PreviewTrack
              track={this.props.items.video[key]}
              key={this.props.items.video[key]["id"]}
              time={this.props.time}
              playing={this.props.playing}
            />
          ))}
        <br />
        <div className="prev-toolbar">
          <button onClick={this.stop} className="no-border" title="재생 중지">
            <i className="material-icons" aria-hidden="true">
              stop
            </i>
          </button>
          {this.props.playing ? (
            <button onClick={this.props.pause} title="재생 일시 중지">
              <i className="material-icons" aria-hidden="true">
                pause
              </i>
            </button>
          ) : (
            <button onClick={this.props.play} title="계속 재생">
              <i className="material-icons" aria-hidden="true">
                play_arrow
              </i>
            </button>
          )}
          <button disabled title="이전 이벤트">
            <i className="material-icons" aria-hidden="true">
              skip_previous
            </i>
          </button>
          <button disabled title="다음 이벤트">
            <i className="material-icons" aria-hidden="true">
              skip_next
            </i>
          </button>
        </div>
      </div>
    );
  }

  stop() {
    this.props.setTime(new Date(1970, 0, 1));
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
