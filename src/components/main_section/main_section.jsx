import React, { useRef } from 'react';
import styles from './main_section.module.css';
import { Nav, NavLink, NavItem } from 'reactstrap';
const MainSection = (props) => {
	const Scroll = require('react-scroll');
	const scroll = Scroll.animateScroll;
	const onClick = () => {
		scroll.scrollTo(730);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<h1 className={styles.text}>Realtime Collaborative Video Editor</h1>
					<img className={styles.logoImage} src="images/movie-reel.png" alt="logo" />
				</div>
				<div className={styles.logoContainer}>
					<h1 className={styles.logo}>(RCV)</h1>
				</div>
				<div className={styles.buttonContainer}>
					<button className={styles.startButton} onClick={onClick}>
						시작하기
					</button>
				</div>
				<img className={styles.mainImage} src="images/collaboration.jpg" alt="main image" />
			</div>
		</>
	);
};

export default MainSection;
