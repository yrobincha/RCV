import React from 'react';
import styles from './feature_section.module.css';
import { Container, Row, Col } from 'reactstrap';
const FeatureSection = (props) => {
	return (
		<Container className={styles.container}>
			<Row className={styles.containerRow}>
				<Col xs="6" sm="4">
					<img className={styles.featureImage} src="/images/movie-player.png" alt="movie" />
					<h1 className={styles.feature}>동영상 편집</h1>
					<body className={styles.featureContent}>
					동영상 편집을 위한 기능들을 제공합니다. 실시간으로 접속중인 사람들과 작업 중인 동영상을 볼 수 있습니다.
					</body>
				</Col>
				<Col xs="6" sm="4">
					<img className={styles.featureImage} src="/images/chat.png" alt="chat" />
					<h1 className={styles.feature}>실시간 피드백</h1>
					<body className={styles.featureContent}>
					실시간 피드백 기능을 제공하여 협업의 효율을 높여줍니다. 
					</body>
				</Col>
				<Col sm="4">
					<img className={styles.featureImage} src="/images/collaboration-icon.png" alt="collaboration" />
					<h1 className={styles.feature}>작업물 공유</h1>
					<body className={styles.featureContent}>
					편집이 완료된 작업물을 SNS 서비스를 통해 간편하게 공유할 수 있습니다.
					</body>
				</Col>
			</Row>
		</Container>
	);
};

export default FeatureSection;
