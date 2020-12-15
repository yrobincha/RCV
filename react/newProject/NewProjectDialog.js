import React, { useEffect, useState } from 'react';
import FeatureSection from '../editor/FeatureSection';
import Footer from '../editor/Footer';
import Header from '../editor/Header';
import MainSection from '../editor/MainSection';
import CreateNewProject from '../editor/CreateNewProject';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function NewProjectDialog() {
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		const id = window.localStorage.getItem('id');
		if (id) {
			onLogin();
			console.log('logged in');
		} else {
			onLogout();
			console.log('not logged in');
		}
	});

	const onLogin = () => {
		setLogged(true);
	};

	const onLogout = () => {
		setLogged(false);

		const provider = window.localStorage.getItem('provider');
		if (provider === 'google') {
			const auth2 = window.gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('Google logout');
			});
		} else if (provider === 'kakao') {
			window.Kakao.Auth.logout(function () {
				console.log('Kakao logout');
			});
		}

		window.localStorage.clear();
	};

	return (
		<Router>
			<Switch>
				<Route path={['/', '/home']} exact>
					<Header logged={logged} onLogout={onLogout} onLogin={onLogin} />
					<MainSection logged={logged} onLogin={onLogin} />
					<FeatureSection />
					<Footer />
				</Route>
				<Route path="/project">
					<CreateNewProject />
				</Route>
			</Switch>
		</Router>
	);
}
export default NewProjectDialog;
