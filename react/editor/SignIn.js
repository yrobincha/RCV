import React, { Component } from 'react';

class SignIn extends Component {
	render() {
		const { isOpen, close, create } = this.props;
		return (
			<>
				{isOpen ? (
					<div id={'modal'}>
						<div onClick={close}>
							<h1 className={'title'}>Projects</h1>
							<p>진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.</p>
							<button onClick={create} id={'create-project-button'}>
								Add Project
							</button>
						</div>
					</div>
				) : null}
			</>
		);
	}
}

export default SignIn;
