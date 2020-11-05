import React from 'react';
import styles from './header.module.css';
import { GoogleLogin } from 'react-google-login';
const Header = (props) => {
	const responseGoogle = (res) => {
		console.log(res);
	};

	const responseFail = (err) => {
		console.log(err);
	};

	return (
		<header className={styles.header}>
			<h1>RCV</h1>
			<GoogleLogin
				clientId="439002818439-7schr17esj308t5h9cr9f6cbrfcltmsf.apps.googleusercontent.com"
				buttonText="Sign in with google"
				onSuccess={responseGoogle}
				onFailure={responseFail}
				cookiePolicy={'single_host_origin'}
			/>
		</header>
	);
};

export default Header;
