import React, { Component } from 'react';
import styles from './app.module.css';
import '../node_modules/video-react/dist/video-react.css';
import Header from './components/header/header';
import VideoPlayer from './components/videoPlayer/videoPlayer';
import VideoSelector from './components/videoSelector/videoSelector';

function App() {
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.container}>
				<VideoSelector />
				<VideoPlayer />
			</div>
		</div>
	);
}
export default App;
