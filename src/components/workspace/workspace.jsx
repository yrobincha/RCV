import React from 'react';
import styles from './workspace_module.css';
const Workspace = (props) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Workspace</h1>
			<button className={styles.addProjectButton}>Add Project</button>
		</div>
	);
};

export default Workspace;
