import React from 'react';
import { useHistory } from 'react-router';

const MainSection = ({ logged }) => {
	const history = useHistory();
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
				<div className={'button-container'}>
					<button
						className={'start-button'}
						onClick={() => {
							if (logged === true) {
								history.push('/project');
								console.log('logged in');
							}
						}}
					>
						시작하기
					</button>
				</div>
			</div>
			<img className={'main-image'} src="images/collaboration.jpg" alt="main image" />
		</>
	);
};

export default MainSection;
