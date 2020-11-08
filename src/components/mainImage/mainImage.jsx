import React from 'react';
import styles from './mainImage.module.css';
const MainImage = (props) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<h1 className={styles.mainLogo}>Realtime Collaborative Video editor</h1>
				</div>
				<div className={styles.buttonContainer}>
					<button className={styles.startButton}>시작하기</button>
				</div>
				<img className={styles.mainImage} src="images/collaboration.jpg" alt="main image" />
			</div>
		</>
	);
};

export default MainImage;
