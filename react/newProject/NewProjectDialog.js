import React from 'react';
import FeatureSection from '../editor/FeatureSection';
import Footer from '../editor/Footer';
import Header from '../editor/Header';
import MainSection from '../editor/MainSection';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CreateNewProject from '../editor/CreateNewProject';

// Modal.setAppElement(document.body);

function NewProjectDialog() {
	const history = useHistory();

	return (
		<Router>
			<Switch>
				<Route path={['/', '/home']} exact>
					<Header />
					<MainSection />
					<FeatureSection />
					<Footer />
				</Route>
				<Route path="/project" exact>
					<CreateNewProject />
				</Route>
			</Switch>
		</Router>
	);
}

export default NewProjectDialog;
