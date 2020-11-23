import React from 'react';
import styles from './header.module.css';
import Login from '../login/login';
const Header = ({ isLoggedIn }) => {
	return (
		<header id={'header'}>
			<div className={'header-container'}>
				<Login isLoggedIn={isLoggedIn} />
			</div>
		</header>
	);
};

export default Header;
