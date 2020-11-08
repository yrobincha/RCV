import React from 'react';
import styles from './header.module.css';
import Login from '../login/login';
import People from '../people/people';
import Project from '../project/project';
const Header = (props) => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Login />
			</div>
		</header>
	);
};

export default Header;
