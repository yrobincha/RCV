import React from 'react';

const MainSection = (props) => {
	return (
		<>
			<div className={'main-section'}>
				<div className={'text-container'}>
					<h1 className={'title'}>Realtime Collaborative Video Editor</h1>
					<img className={'title-image'} src="images/movie-reel.png" alt="logo" />
				</div>
				<div className={'logo-container'}>
					<h1 className={'logo'}>(RCV)</h1>
				</div>
			</div>
			<img className={'main-image'} src="images/collaboration.jpg" alt="main image" />
		</>
	);
};

export default MainSection;
