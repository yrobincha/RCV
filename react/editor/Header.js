import React from 'react';
import Login from './Login';

const Header = (props) => {
	return (
		<div id={'header'}>
			<div className={'container'}>
				<Login />
			</div>
		</div>
	);
};

export default Header;
