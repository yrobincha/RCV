import React, { Component } from 'react';
import { server } from '../../config';
class InviteDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			link: ''
		};

		this.handleInviteDialog = this.handleInviteDialog.bind(this);
	}

	handleInviteDialog() {
		const url = `${server.serverUrl}/project/${this.props.project}`;
		console.log(url);
	}

	render() {
		return (
			<div className={'invite-button-container'}>
				<button className={'invite-button'} onClick={this.handleInviteDialog}>
					초대하기
				</button>
			</div>
		);
	}
}

export default InviteDialog;
