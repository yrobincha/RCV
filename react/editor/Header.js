import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithKakao from './SignInWithKakao';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

const Hidden = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 0px;
	height: 0px;
	z-index: -100;
`;

const Header = ({ logged, onLogout, onLogin }) => {
	const name = window.localStorage.getItem('name');
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

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
					<>
						<a className={'login'} onClick={openModal}>
							로그인
						</a>
						<LoginModal isModalOpen={isModalOpen} closeModal={closeModal} onLogin={onLogin} />
						<Hidden>
							<SignInWithGoogle className={'hidden-google'} onLogin={onLogin} />
							<SignInWithKakao className={'hidden-kakao'} onLogin={onLogin} />
						</Hidden>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
