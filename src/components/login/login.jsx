import React from 'react';
import styles from './login.module.css';
import { GoogleLogin } from 'react-google-login';
const Login = (props) => {
	const responseGoogle = (res) => {
		console.log(res);
	};

	const responseFail = (err) => {
		console.log(err);
	};

	return (
		<div>
			<a className={styles.login}>로그인</a>
			<GoogleLogin
				className={styles.googleLogin}
				clientId={process.env.REACT_APP_GOOGLE_API_KEY}
				buttonText="Sign in with google"
				onSuccess={responseGoogle}
				onFailure={responseFail}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default Login;
