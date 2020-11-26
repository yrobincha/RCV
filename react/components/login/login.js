import React, { useState } from 'react';
import styles from './login.module.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const Login = ({ isLoggedIn }) => {
	const [userName, setUserName] = useState('');

	const setLoggedIn = () => {
		isLoggedIn = true;
	};

	const setLoggedOut = () => {
		isLoggedIn = false;
	};

	const responseGoogle = (user) => {
		console.log(user.getBasicProfile().getId());
		const name = user.getBasicProfile().getName();
		axios.post('/login', {
			userID: user.getBasicProfile().getId(),
			uname: user.getBasicProfile().getName()
		});
		// userName = user.getBasicProfile.getName();
		console.log('Signed in as ' + user.getBasicProfile().getName());
		setLoggedIn();
		setUserName(name);
		// userList.push(userName);
	};

	const responseFail = (err) => {
		console.log(err);
	};

	return (
		<div id={'login'}>
			{isLoggedIn ? (
				<>
					<a className={'user-name'}>Hello {userName}</a>
					<a className={'login-button'} onClick={setLoggedOut}>
						로그아웃
					</a>
				</>
			) : (
				<>
					<a className={'login-button'}>로그인</a>
					<GoogleLogin
						className={'google-login-button'}
						clientId="439002818439-7schr17esj308t5h9cr9f6cbrfcltmsf.apps.googleusercontent.com"
						buttonText="Sign in with google"
						onSuccess={responseGoogle}
						onFailure={responseFail}
						cookiePolicy={'single_host_origin'}
					/>
				</>
			)}
		</div>
	);
};

export default Login;
