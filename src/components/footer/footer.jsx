import React from 'react';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = (props) => {
	return (
		<>
			<FontAwesomeIcon icon={['fab', 'google']} />
			<footer className={styles.footer}>© Copyright 2020 RCV</footer>
		</>
	);
};

export default Footer;
