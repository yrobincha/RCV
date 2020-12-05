import React, { Component } from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
require('dotenv').config();
class SignInWithKakao extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			provider: ''
		};
	}

	responseKakao(user) {
		console.log('Signed in as ' + user.profile.id);
		// console.log(user.profile.properties.nickname);
		axios
			.post('/login', {
				userID: user.profile.id,
				name: user.profile.properties.nickname
			})
			.then((res) => {
				console.log(res);
			});
		this.setState({
			id: user.profile.id,
			name: user.profile.properties.nickname,
			provider: 'kakao'
		});
		this.doSignUp();
		if (this.props.isModalOpen === true) {
			this.props.closeModal();
		}
	}

	responseFail(err) {
		console.log(err);
	}

	doSignUp() {
		const { id, name, provider } = this.state;
		window.localStorage.setItem('id', id);
		window.localStorage.setItem('name', name);
		window.localStorage.setItem('provider', provider);
		this.props.onLogin();
	}

	render() {
		return (
			<div id={'login'}>
				<>
					<KakaoLogin
						token={process.env.KAKAO_API_KEY}
						buttonText="카카오로 로그인하기"
						onSuccess={(user) => this.responseKakao(user)}
						onFailure={(err) => this.responseFail(err)}
						getProfile={true}
					/>
				</>
			</div>
		);
	}
}

export default SignInWithKakao;
