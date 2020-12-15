import React, { Component } from 'react';

class UserListDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPopoverOpen: false,
			id: '',
			provider: '',
			userList: []
		};

		this.onHover = this.onHover.bind(this);
		this.onHoverLeave = this.onHoverLeave.bind(this);
	}

	componentDidMount() {
		const userId = window.localStorage.getItem('id');
		const prov = window.localStorage.getItem('provider');
		this.setState({
			id: userId,
			provider: prov
		});
	}

	onHover() {
		this.setState({
			isPopoverOpen: true
		});
	}

	onHoverLeave() {
		this.setState({
			isPopoverOpen: false
		});
	}
	render() {
		let userList = this.props.userList.map((user) => (
			<div key={user} className={'user-list'}>
				<div className={'user-container'}>
					<img className={'profile-image'} src="../images/sample-profile.jpeg" alt="Img" />
					<p className={'user'}>{user}</p>
				</div>
			</div>
		));

		return (
			<>
				<div className={'user-list-container'}>
					<button className={'user-list-button'} onMouseEnter={this.onHover} onMouseLeave={this.onHoverLeave}>
						참여자 목록
					</button>
				</div>
				{this.state.isPopoverOpen && <>{userList}</>}
			</>
		);
	}
}

export default UserListDialog;
