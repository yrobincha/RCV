import React from 'react';
import { useHistory } from 'react-router';
import styles from './projects_module.css';
const Projects = (props) => {
	const history = useHistory();

	const addProject = () => {
		console.log('add');
		history.push('/new');
	};

	return (
		<div id="container" className={styles.container}>
			<div id="textContainer" className={styles.textContainer}>
				<h1 id="title" className={styles.title}>
					Projects
				</h1>
				<p>진행 중인 프로젝트가 없습니다. 새로운 프로젝트를 추가하세요.</p>
			</div>
			<button onClick={addProject} id="addProjectButton" className={styles.addProjectButton}>
				Add Project
			</button>
		</div>
	);
};

export default Projects;
