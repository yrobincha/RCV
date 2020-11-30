import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithKakao from './SignInWithKakao';

const LoginModal = ({ isModalOpen, closeModal, onLogin }) => {
	
	return (
		<>
			{isModalOpen ? (
				<div className={'login-failed-modal'}>
					<h1 onClick={closeModal} className={'title'}>
						시작하기
					</h1>
					<SignInWithGoogle onLogin={onLogin} closeModal={closeModal} isModalOpen={isModalOpen} />
					<SignInWithKakao onLogin={onLogin} closeModal={closeModal} isModalOpen={isModalOpen} />
				</div>
			) : null}
		</>
	);
};

export default LoginModal;
