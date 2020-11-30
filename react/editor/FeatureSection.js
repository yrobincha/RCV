import React from 'react';

const FeatureSection = (props) => {
	return (
		<>
			<div className={'feature-section'}>
				<div className={'feature-container'}>
					<img className={'feature-image'} src="/images/movie-player.png" alt="movie" />
					<h1 className={'feature'}>동영상 편집</h1>
					<div className={'feature-content'}>
						동영상 편집을 위한 기능들을 제공합니다. 실시간으로 접속중인 사람들과 작업 중인 동영상을 볼 수 있습니다.
					</div>
				</div>

				<div className={'feature-container'}>
					<img className={'feature-image'} src="/images/chat.png" alt="chat" />
					<h1 className={'feature'}>실시간 피드백</h1>
					<div className={'feature-content'}>
						실시간 피드백 기능을 제공하여 협업의 효율을 높여줍니다. 편집이 완료된 작업물을 SNS 서비스를 통해 간편하게
						공유할 수 있습니다.
					</div>
				</div>

				<div className={'feature-container'}>
					<img className={'feature-image'} src="/images/collaboration-icon.png" alt="collaboration" />
					<h1 className={'feature'}>작업물 공유</h1>
					<div className={'feature-content'}>편집이 완료된 작업물을 SNS 서비스를 통해 간편하게 공유할 수 있습니다.</div>
				</div>
			</div>
		</>
	);
};

export default FeatureSection;
