import React, { useEffect, useState } from 'react';
import FeatureSection from '../editor/FeatureSection';
import Footer from '../editor/Footer';
import Header from '../editor/Header';
import MainSection from '../editor/MainSection';
import CreateNewProject from '../editor/CreateNewProject';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Modal.setAppElement(document.body);

function NewProjectDialog() {
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		const id = window.sessionStorage.getItem('id');
		console.log(id);
		if (id) {
			onLogin();
		} else {
			onLogout();
		}
	});

	const onLogin = () => {
		setLogged(true);
	};

	const onLogout = () => {
		setLogged(false);

		const provider = window.sessionStorage.getItem('provider');
		if (provider === 'google') {
			const auth2 = window.gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('Google logout');
			});
		}

		window.sessionStorage.clear();
	};

	return (
		<Router>
			<Switch>
				<Route path={['/', '/home']} exact>
					<Header logged={logged} onLogout={onLogout} onLogin={onLogin} />
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
