import React from 'react';
import Login from './Login';

const LoginFailedModal = ({ isModalOpen, closeModal, onLogin }) => {
	return (
		<>
			{isModalOpen ? (
				<div className={'login-failed-modal'}>
					<h1 onClick={closeModal} className={'title'}>
						시작하기
					</h1>
					<Login onLogin={onLogin} />
				</div>
			) : null}
		</>
	);
};

export default LoginFailedModal;
