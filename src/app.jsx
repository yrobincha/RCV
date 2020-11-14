import React from 'react';
import styles from './app.module.css';
import '../node_modules/video-react/dist/video-react.css';
import Header from './components/header/header';
import VideoSelector from './components/video_selector/video_selector';
import Footer from './components/footer/footer';
import MainSection from './components/main_section/main_section';
import FeatureSection from './components/feature_section/feature_section';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Test from './components/Test';
import Workspace from './components/workspace/workspace';

function App() {
	return (
		<Router>
			<Switch>
				<Route path={['/', '/home']} exact>
					<div className={styles.app}>
						<Header />
						{/* <Test /> */}
						<div className={styles.container}>
							<MainSection />
							<VideoSelector />
						</div>
						<FeatureSection />
						<Footer />
					</div>
				</Route>
				<Route path="/workspace">
					<Workspace />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
