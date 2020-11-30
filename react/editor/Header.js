import React from 'react';
import Login from './Login';

const Header = ({ logged, onLogout, onLogin }) => {
	const name = window.sessionStorage.getItem('name');
	return (
		<div id={'header'}>
			<div className={'container'}>
				{logged ? (
					<>
						<a className={'user-name'}>Hello {name}</a>
						<a className={'login'} onClick={onLogout}>
							로그아웃
						</a>
					</>
				) : (
					<Login onLogin={onLogin} />
				)}
			</div>
		</div>
	);
};

export default Header;
