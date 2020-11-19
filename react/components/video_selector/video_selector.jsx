import React, { useState } from 'react';
import Player from 'video-react/lib/components/Player';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './video_selector.module.css';
import LoadingSpinner from 'video-react/lib/components/LoadingSpinner';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';
import PlayToggle from 'video-react/lib/components/control-bar/PlayToggle';
import FeedbackModal from '../feedback_modal/feedback_modal';
const VideoSelector = (props) => {
	const [videoFileURL, setVideoURL] = useState(null);

	const handleVideoLoad = (file) => {
		const fileURL = URL.createObjectURL(file);
		if (fileURL !== null) {
			setVideoURL(fileURL);
		}
	};

	const onVideoLoad = (files) => {
		if (files.length !== 0) {
			handleVideoLoad(files[0]);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<label className={styles.uploadLabel} htmlFor="ex_filename">UPLOAD VIDEO</label>
				{/* <FontAwesomeIcon icon={faUpload} /> */}
				<input //
					className={styles.uploadHidden}
					type="file"
					id="ex_filename"
					name="video"
					multiple={false}
					onChange={(e) => onVideoLoad(e.target.files)}
				/>
			</div>
			<div className={styles.playerContainer}>
				<Player className={styles.videoPlayer} playsInline src={videoFileURL} fluid={false} width={1024} height={480}>
					<LoadingSpinner />
					<ControlBar autoHide={false}>
						<PlayToggle />
					</ControlBar>
				</Player>
				<div className={styles.modalContainer}>
					<FeedbackModal className={styles.feedbackModal} />
					<FeedbackModal className={styles.feedbackModal} />
					<FeedbackModal className={styles.feedbackModal} />
				</div>
			</div>
		</div>
	);
};

export default VideoSelector;
