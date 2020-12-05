import React, { useState } from 'react';
import { useHistory } from 'react-router';
import LoginModal from './LoginModal';

const MainSection = ({ logged, onLogin }) => {
	const history = useHistory();
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className={'main-section'}>
				<div className={'text-container'}>
					<h1 className={'title'}>Realtime Collaborative Video Editor</h1>
					<img className={'title-image'} src="images/movie-reel.png" alt="logo" />
				</div>
				<div className={'logo-container'}>
					<h1 className={'logo'}>(RCV)</h1>
				</div>
				<div className={'button-container'}>
					<button
						className={'start-button'}
						onClick={() => {
							if (logged === true) {
								history.push('/project');
							} else {
								openModal();
							}
						}}
					>
						시작하기
					</button>
				</div>
				<LoginModal isModalOpen={isModalOpen} closeModal={closeModal} onLogin={onLogin} />
			</div>
			<img className={'main-image'} src="images/collaboration.jpg" alt="main image" />
		</>
	);
};

export default MainSection;
