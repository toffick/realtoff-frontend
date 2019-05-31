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
				withPreview
				buttonText="Загрузите фотографии"
				onChange={this.onDrop}
				imgExtension={['.jpg', '.jpeg', '.png']}
				label={'Загрузите до 10 фотографий в формате jpg, jpeg и png'}
				maxFileSize={3145728}
				fileSizeError="Размер фото слишком большой"
			/>
		);
	}

}

export default PhotoUploader;
