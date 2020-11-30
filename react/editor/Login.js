import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			provider: ''
		};
	}

	responseGoogle(user) {
		const name = user.getBasicProfile().getName();
		console.log('Signed in as ' + user.getBasicProfile().getName());
		axios
			.post('/login', {
				userID: user.getBasicProfile().getId(),
				name: user.getBasicProfile().getName()
			})
			.then((res) => {
				console.log(res);
			});
		this.setState({
			id: user.getBasicProfile().getId(),
			name: user.getBasicProfile().getName(),
			provider: 'google'
		});
		// console.log(this.state.id, this.state.name, this.state.provider);
		// this.props.onLogin();
		this.doSignUp();
	}

	responseFail(err) {
		console.log(err);
	}

	doSignUp() {
		const { id, name, provider } = this.state;

		window.sessionStorage.setItem('id', id);
		window.sessionStorage.setItem('name', name);
		window.sessionStorage.setItem('provider', provider);
		this.props.onLogin();
	}

	render() {
		return (
			<div id={'login'}>
				<>
					<GoogleLogin
						className={'google-login-button'}
						clientId="439002818439-7schr17esj308t5h9cr9f6cbrfcltmsf.apps.googleusercontent.com"
						buttonText="Sign in with google"
						onSuccess={(user) => this.responseGoogle(user)}
						onFailure={(err) => this.responseFail(err)}
						cookiePolicy={'single_host_origin'}
					/>
				</>
			</div>
		);
	}
}

export default Login;
