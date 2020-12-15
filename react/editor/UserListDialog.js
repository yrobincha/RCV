import React, { Component } from 'react';

class UserListDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPopoverOpen: false,
			id: '',
			provider: ''
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
		const userList = this.props.userList.map((user) => (
			<div key={user} className={'user-list'}>
				{/* <h1>Test</h1> */}
				<div className={'user-container'}>
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
