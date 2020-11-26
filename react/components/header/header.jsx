import React from 'react';
import styles from './header.module.css';
import Login from '../login/login';
const Header = ({ isLoggedIn }) => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Login isLoggedIn={isLoggedIn} />
			</div>
		</header>
	);
};

export default Header;
