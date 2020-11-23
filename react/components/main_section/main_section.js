import React, { useRef } from 'react';
import styles from './main_section.module.css';
import { Nav, NavLink, NavItem } from 'reactstrap';
import StartButton from '../start_button/start_button';
import Header from '../header/header';
const MainSection = (props) => {
	const Scroll = require('react-scroll');
	const scroll = Scroll.animateScroll;
	let isLoggedIn = false;

	return (
		<>
			<Header isLoggedIn={isLoggedIn} />
			<div id={'main-section'}>
				<div className={'text-container'}>
					<h1 className={'text'}>Realtime Collaborative Video Editor</h1>
					<img className={'logo-image'} src="images/movie-reel.png" alt="logo" />
				</div>
				<div className={'logo-container'}>
					<h1 className={'logo'}>(RCV)</h1>
				</div>
				<div className={'button-container'}>
					<StartButton isLoggedIn={isLoggedIn} />
				</div>
				<img className={'main-image'} src="images/collaboration.jpg" alt="main image" />
			</div>
		</>
	);
};

export default MainSection;
