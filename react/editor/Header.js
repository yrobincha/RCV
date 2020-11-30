import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';

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
					<SignInWithGoogle onLogin={onLogin} />
				)}
			</div>
		</div>
	);
};

export default Header;
