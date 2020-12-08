import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
class LoginByInviteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			provider: ''
		};
	}

	responseGoogle(user) {
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
		// this.doSignUp();
		// if (this.props.isModalOpen === true) {
		// 	this.props.closeModal();
		// }
		this.props.onLogin();
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
		this.props.onLogin();
	}

	responseFail(err) {
		console.log(err);
	}

	render() {
		return (
			<div className={'login-modal'}>
				<ModalOverlay />
				<ModalWrapper>
					<ModalInner>
						<div className={'title-container'}>
							<h1 className={'title'}>프로젝트 참여하기</h1>
						</div>
						<div id={'login'}>
							<GoogleLogin
								className={'google-login-button'}
								clientId={process.env.GOOGLE_API_KEY}
								buttonText="Sign in with google"
								onSuccess={(user) => this.responseGoogle(user)}
								onFailure={(err) => this.responseFail(err)}
								cookiePolicy={'single_host_origin'}
							/>
							<>
								<KakaoLogin
									className={'kakao-login-button'}
									token={process.env.KAKAO_API_KEY}
									buttonText="카카오로 로그인하기"
									onSuccess={(user) => this.responseKakao(user)}
									onFailure={(err) => this.responseFail(err)}
									getProfile={true}
								/>
							</>
						</div>
					</ModalInner>
				</ModalWrapper>
			</div>
		);
	}
}

const ModalOverlay = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
`;

const ModalWrapper = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	overflow: auto;
	outline: 0;
`;

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	background-color: #161616;
	border-radius: 10px;
	width: 320px;
	max-width: 480px;
	height: 300px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 20px 20px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export default LoginByInviteModal;
