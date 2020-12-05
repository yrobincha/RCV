import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import axios from 'axios';
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

	responseFail(err) {
		console.log(err);
	}

	render() {
		return (
			<div>
				<ModalOverlay />
				<ModalWrapper>
					<ModalInner>
						<GoogleLogin
							className={'google-login-button'}
							clientId={process.env.GOOGLE_API_KEY}
							buttonText="Sign in with google"
							onSuccess={(user) => this.responseGoogle(user)}
							onFailure={(err) => this.responseFail(err)}
							cookiePolicy={'single_host_origin'}
						/>
					</ModalInner>
				</ModalWrapper>
			</div>
		);
	}
}

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

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 10px;
	width: 360px;
	max-width: 480px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 40px 20px;
`;

export default LoginByInviteModal;
