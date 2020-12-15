import React, { useEffect, useState } from 'react';
import { server } from '../../config';
import axios from 'axios';

const CreateNewProject = () => {
	const [projects, setProjects] = useState([]);
	const [newProject, setNewProject] = useState('');
	const [isCreateOpen, setCreateOpen] = useState(false);

	useEffect(() => {
		axios.get('/api/projects', {}).then((res) => {
			setProjects(res.data);
		});
	}, []);

	const createProject = (projectName) => {
		const data = { projectName: projectName };
		const url = `${server.apiUrl}/project`;
		const params = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
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
			.catch((error) => this.openFetchErrorDialog(error.message));
	};

	const handleOpen = () => {
		if (isCreateOpen === true) {
			setCreateOpen(false);
		} else {
			setCreateOpen(true);
		}
	};

	const handleChange = (event) => {
		setNewProject(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newProject !== '') {
			createProject(newProject);
		}
	};

	const navigateToProject = (projectID) => {
		window.location = `${server.serverUrl}/project/${projectID}`;
	};

	return (
		<div className={'create-new-project'}>
			<div className={'container'}>
				<h1 className={'title'}>Projects</h1>
				<div className={'project-list-container'}>
					{projects ? (
						projects.map((project) => (
							<button
								key={project.projectID}
								className={'project-list-button'}
								onClick={() => navigateToProject(project.projectID)}
							>
								{project.name}
							</button>
						))
					) : (
						<p className={'content'}>진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.</p>
					)}
					<p> 또는 </p>
					<button className={'open-create-button'} onClick={handleOpen}>
						프로젝트 생성하기
					</button>
					{isCreateOpen && (
						<>
							<input
								type="text"
								value={newProject}
								onChange={handleChange}
								className={'input-project-name'}
								placeholder={'새로운 프로젝트의 이름을 입력해 주세요.'}
							/>
							<form onSubmit={handleSubmit} className={'create-project-form'}>
								<input type="submit" value="새 프로젝트 생성" className={'create-project-button'} />
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateNewProject;
