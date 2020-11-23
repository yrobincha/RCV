import React, { Component } from 'react';

class SignIn extends Component {
	render() {
		const { isOpen, close } = this.props;
		return (
			<>
				{isOpen ? (
					<div className={'modal'}>
						<div onClick={close}>
							<h1 onClick={close}>Test</h1>
						</div>
					</div>
				) : null}
			</>
		);
	}
}

export default SignIn;
