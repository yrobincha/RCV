import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubmitToolbar extends Component {
	render() {
		return (
			<div className="right">
				<a href={'/project/' + this.props.project + '/output.mp4'} target="_blank" rel="noreferrer" download>
					영상 내려받기
				</a>
				{this.props.progress !== null && this.props.progress < 100 ? (
					<div>
						<label htmlFor="progress">비디오 처리: </label>
						{this.props.progress}%
						<progress id="progress" value={this.props.progress} max="100" />
					</div>
				) : null}
			</div>
		);
	}
}

SubmitToolbar.propTypes = {
	progress: PropTypes.number,
	project: PropTypes.string.isRequired,
	openSubmitDialog: PropTypes.func.isRequired
};
