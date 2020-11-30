import React from 'react';
import Login from './Login';

const LoginModal = ({ isModalOpen, closeModal, onLogin }) => {
	return (
		<>
			{isModalOpen ? (
				<div className={'login-failed-modal'}>
					<h1 onClick={closeModal} className={'title'}>
						시작하기
					</h1>
					<Login onLogin={onLogin} closeModal={closeModal} />
				</div>
			) : null}
		</>
	);
};

export default LoginModal;
