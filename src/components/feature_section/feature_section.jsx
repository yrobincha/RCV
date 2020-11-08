import React from 'react';
import styles from './feature_section.module.css';
const FeatureSection = (props) => {
	return (
		<div className={styles.featureSection}>
			<div className={styles.imageContainer}>
				<img className={styles.featureImage} src="/images/movie-player.png" alt="movie" />
				<img className={styles.featureImage} src="/images/chat.png" alt="chat" />
				<img className={styles.featureImage} src="/images/collaboration-icon.png" alt="collaboration" />
			</div>
		</div>
	);
};

export default FeatureSection;
