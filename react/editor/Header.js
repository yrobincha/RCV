import React from 'react';
import Login from './Login';

const Header = (props) => {
	let isLoggedIn = false;
	return (
		<div id={'header'}>
			<div className={'container'}>
				<Login isLoggedIn={isLoggedIn} />
			</div>
		</div>
	);
};

export default Header;
