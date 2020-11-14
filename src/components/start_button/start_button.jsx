import React from 'react';
import styles from './start_button.module.css';
import { useHistory } from 'react-router-dom';
const StartButton = ({ isLoggedIn }) => {
	const history = useHistory();

	return (
		<button
			className={styles.startButton}
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
	);
};

export default StartButton;
