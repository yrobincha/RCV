import React, { useState } from 'react';
import Player from 'video-react/lib/components/Player';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './videoSelector.module.css';
import LoadingSpinner from 'video-react/lib/components/LoadingSpinner';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
const VideoSelector = (props) => {
	const [videoFileURL, setVideoURL] = useState(null);

	const handleVideoLoad = (file) => {
		const fileURL = URL.createObjectURL(file);
		if (fileURL !== null) {
			setVideoURL(fileURL);
		}
	};

	const onVideoLoad = (files) => {
		if (files !== null) {
			handleVideoLoad(files[0]);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.videoInput}>
				<form id="videoFile" className={styles.videoFile}>
					<input //
						type="file"
						name="video"
						multiple={false}
						onChange={(e) => onVideoLoad(e.target.files)}
					/>
				</form>
			</div>
			<Player className={styles.videoPlayer} playsInline src={videoFileURL} fluid={false} width={1024} height={480}>
				<LoadingSpinner />
				<ControlBar autoHide={false}>
					<PlayToggle />
				</ControlBar>
			</Player>
		</div>
	);
};

export default VideoSelector;
