import React, { Component } from 'react';
import Modal from 'react-modal';
import { server } from '../../config';
import FeatureSection from '../editor/FeatureSection';
import Footer from '../editor/Footer';
import Header from '../editor/Header';
import MainSection from '../editor/MainSection';
import CreateProject from '../editor/CreateProject';

Modal.setAppElement(document.body);

export default class NewProjectDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		};
	}

	createProject() {
		const url = `${server.apiUrl}/project`;
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		};

		fetch(url, params)
			.then((response) => response.json())
			.then((data) => {
				if (typeof data.err === 'undefined') {
					window.location = `${server.serverUrl}/project/${data.project}`;
				} else {
					alert(`${data.err}\n\n${data.msg}`);
				}
			})
			.catch((error) => console.log(error));
	}

	openModal() {
		this.setState({ isModalOpen: true });
	}

	closeModal() {
		this.setState({ isModalOpen: false });
	}

	render() {
		return (
			<>
				<Header />
				<MainSection />
				<div className={'button-container'}>
					<button id={'create-project-button'} onClick={() => this.openModal()}>
						시작하기
					</button>
					<CreateProject
						isOpen={this.state.isModalOpen}
						close={() => this.closeModal()}
						create={() => this.createProject()}
					/>
				</div>
				<FeatureSection />
				<Footer />
			</>
		);
	}
}
