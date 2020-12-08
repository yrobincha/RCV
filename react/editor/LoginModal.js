import React, { useEffect } from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithKakao from './SignInWithKakao';
import styled from 'styled-components';
const LoginModal = ({ isModalOpen, closeModal, onLogin }) => {
	useEffect(() => {
		// document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
		// return () => {
		// 	const scrollY = document.body.style.top;
		// 	document.body.style.cssText = `position: ""; top: "";`;
		// 	window.scrollTo(0, parseInt(scrollY || '0') * -1);
		// };
	}, []);
	return (
		<>
			{isModalOpen ? (
				// <div className={'login-failed-modal'}>
				<div className={'login-modal'}>
					<ModalOverlay />
					<ModalWrapper>
						<ModalInner>
							<div className={'close-button-container'}>
								<a className={'close-button'} onClick={closeModal}></a>
							</div>
							<div className={'title-container'}>
								<h1 className={'title'}>시작하기</h1>
							</div>
							<SignInWithGoogle onLogin={onLogin} closeModal={closeModal} isModalOpen={isModalOpen} />
							<SignInWithKakao onLogin={onLogin} closeModal={closeModal} isModalOpen={isModalOpen} />
						</ModalInner>
					</ModalWrapper>
				</div>
			) : null}
		</>
	);
};

const ModalOverlay = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
`;

const ModalWrapper = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	overflow: auto;
	outline: 0;
`;

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	background-color: #161616;
	border-radius: 10px;
	width: 320px;
	max-width: 480px;
	height: 300px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export default LoginModal;
