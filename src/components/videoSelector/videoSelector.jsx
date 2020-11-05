import React, { useState } from 'react';
import Player from 'video-react/lib/components/Player';

const VideoSelector = (props) => {
	const [videoFileURL, setVideoURL] = useState();

	const handleVideoLoad = (file) => {
		const fileURL = URL.createObjectURL(file);
		if (fileURL) {
			setVideoURL(fileURL);
		}
	};

	const onVideoLoad = (files) => {
		if (files) {
			handleVideoLoad(files[0]);
		}
	};

	return (
		<div>
			<form id="videoFile">
				<input type="file" name="video" multiple={false} onChange={(e) => onVideoLoad(e.target.files)} />
			</form>
			<Player playsInline src={videoFileURL} fluid={false} width={1024} height={480}></Player>
		</div>
	);
};

export default VideoSelector;
