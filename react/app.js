import React from 'react';
import styles from './app.module.css';
import '../node_modules/video-react/dist/video-react.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import VideoSelector from './components/video_selector/video_selector';
import Footer from './components/footer/footer';
import MainSection from './components/main_section/main_section';
import FeatureSection from './components/feature_section/feature_section';
import Projects from './components/projects/projects';
import AddNewProject from './components/add_new_project/add_new_project';
import FeatureCarousel from './components/feature_carousel/feature_carousel';
import StartButton from './components/start_button/start_button';

// import Test from './components/Test';

function App() {
	return (
		<Router>
			<Switch>
				<Route path={['/', '/home']} exact>
					{/* <Test /> */}
					<MainSection />
					<FeatureSection />
					<FeatureCarousel />
					<Footer />
				</Route>
				<Route path="/new" exact>
					<AddNewProject />
				</Route>
				<Route path="/projects" exact>
					<Projects />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
