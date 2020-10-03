import React, { Component } from "react";
import "./App.css";
import "../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
class App extends Component {
  state = {
    videoFileURL: "",
    videoFileObject: null,
  };

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="/css/video-react.css" />
        <form id="videoFile">
          <input
            type="file"
            name="video"
            multiple="false"
            onChange={(e) => {
              this.handleVideoLoad(e);
            }}
          />
        </form>

        <Player
          playsInline
          src={this.state.videoFileURL}
          fluid={false}
          width={480}
          height={272}
        />
      </div>
    );
  }

  handleVideoLoad(e) {
    console.log(e.target.files);
    let files = e.target.files;
    if (files.length === 1) {
      let file = files[0];
      this.setState({
        videoFileURL: URL.createObjectURL(file),
        videoFileObject: file,
      });
    }
  }
}

export default App;
