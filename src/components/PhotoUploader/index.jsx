import React from 'react';
import ImageUploader from 'react-images-upload';

class PhotoUploader extends React.Component {


	onDrop = (pictures) => {
		// TODO on limit valid
		this.props.onSelectPhotos(pictures);
	}

	render() {
		return (
			<ImageUploader
				withIcon
				buttonText="Загрузите фотографии"
				onChange={this.onDrop}
				imgExtension={['.jpg', '.jpeg']}
				maxFileSize={5242880}
			/>
		);
	}

}

export default PhotoUploader;
