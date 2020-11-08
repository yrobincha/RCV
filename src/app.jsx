import React from 'react';
import styles from './app.module.css';
import '../node_modules/video-react/dist/video-react.css';
import Header from './components/header/header';
import VideoSelector from './components/video_selector/video_selector';
import Footer from './components/footer/footer';
import MainSection from './components/main_section/main_section';
import FeedbackModal from './components/feedback_modal/feedback_modal';
import FeatureSection from './components/feature_section/feature_section';

function App() {
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.container}>
				<MainSection />
				<FeedbackModal />
				<VideoSelector />
				<FeatureSection />
			</div>
			<Footer />
		</div>
	);
}
export default App;
