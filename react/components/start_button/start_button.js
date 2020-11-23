import React from 'react';
import { useHistory } from 'react-router-dom';
const StartButton = ({ isLoggedIn }) => {
	const history = useHistory();

	return (
		<div id={'start-button-container'}>
			<button
				className={'start-button'}
				onClick={() => {
					// if (isLoggedIn) //
					history.push('/projects');
					// else {
					// 	console.log('not yet');
					// }
				}}
			>
				시작하기
			</button>
		</div>
	);
};

export default StartButton;
