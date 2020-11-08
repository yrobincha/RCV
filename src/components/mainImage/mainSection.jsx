import React, { useRef } from 'react';
import styles from './mainSection.module.css';
import { Nav, NavLink, NavItem } from 'reactstrap';
const MainSection = (props) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<h1 className={styles.text}>Realtime Collaborative Video Editor</h1>
				</div>
				<div className={styles.logoContainer}>
					<h1 className={styles.logo}>(RCV)</h1>
				</div>
				<div className={styles.buttonContainer}>
					<button className={styles.startButton}>시작하기</button>
				</div>
				<img className={styles.mainImage} src="images/collaboration.jpg" alt="main image" />
			</div>
		</>
	);
};

export default MainSection;
