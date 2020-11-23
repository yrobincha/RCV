import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			userName: ''
		};
	}

	setLoggedIn() {
		this.setState({ isLoggedIn: true });
	}

	setLoggedOut() {
		this.setState({ isLoggedIn: false });
	}

	setUserName(name) {
		this.setState({ userName: name });
	}

	responseGoogle(user) {
		const name = user.getBasicProfile().getName();
		console.log('Signed in as ' + user.getBasicProfile().getName());
		this.setUserName(name);
		this.setLoggedIn();
	}

	responseFail(err) {
		console.log(err);
	}

	render() {
		return (
			<div id={'login'}>
				{this.state.isLoggedIn ? (
					<>
						<a className={'user-name'}>Hello {this.state.userName}</a>
						<a className={'login'} onClick={() => this.setLoggedOut()}>
							로그아웃
						</a>
					</>
				) : (
					<>
						<a className={'login'}>로그인</a>
						<GoogleLogin
							className={'google-login-button'}
							clientId="439002818439-7schr17esj308t5h9cr9f6cbrfcltmsf.apps.googleusercontent.com"
							buttonText="Sign in with google"
							onSuccess={(user) => this.responseGoogle(user)}
							onFailure={(err) => this.responseFail(err)}
							cookiePolicy={'single_host_origin'}
						/>
					</>
				)}
			</div>
		);
	}
}

export default Login;
