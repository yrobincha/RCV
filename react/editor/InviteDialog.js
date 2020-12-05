import React, { Component } from 'react';
import { server } from '../../config';
import styled from 'styled-components';
class InviteDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
			projectURL: ''
		};

		this.handleInviteDialog = this.handleInviteDialog.bind(this);
	}

	handleInviteDialog() {
		const url = `${server.serverUrl}/project/${this.props.project}`;
		console.log(url);
		this.setState({
			isModalOpen: true,
			projectURL: url
		});
	}

	render() {
		return (
			<div className={'invite-dialog-container'}>
				<button className={'invite-button'} onClick={this.handleInviteDialog}>
					초대하기
				</button>
				{this.state.isModalOpen && (
					<>
						<ModalOverlay />
						<ModalWrapper>
							<ModalInner>
								<h1 className={'invite-title'}>초대 링크 생성 완료</h1>
								<h1 className={'project-url'}>{this.state.projectURL}</h1>
							</ModalInner>
						</ModalWrapper>
					</>
				)}
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
	width: 540px;
	max-width: 720px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 40px 20px;
`;

export default InviteDialog;
