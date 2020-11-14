import React from 'react';
import styles from './start_button.module.css';
import { useHistory } from 'react-router-dom';
const StartButton = (props) => {
	const history = useHistory();

	return (
		<button
			className={styles.startButton}
			onClick={() => {
				history.push('/workspace');
			}}
		>
			시작하기
		</button>
	);
};

export default StartButton;
