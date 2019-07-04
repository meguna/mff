import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from './ImageUpload';

class RecipeImages extends Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      images,
    };
    this.onImageDelete = this.onImageDelete.bind(this);
  }

  onImageUpload = (imagePathArray) => {
    const { onImageStateUpdate } = this.props;
    const { images } = this.state;
    const newImages = [];
    let lastId = 1;
    if (images.length !== 0) {
      lastId = images[images.length - 1].elemId + 1;
    }
    imagePathArray.forEach((path) => {
      newImages.push({
        imagePath: path,
        elemId: lastId,
      });
      lastId++;
    });

    this.setState(prevState => ({
      images: [
        ...prevState.images,
        ...newImages,
      ],
    }), () => {
      const { images: newImageState } = this.state;
      onImageStateUpdate(newImageState);
    });
  }

  onImageDelete = (id, path) => {
    const { images } = this.state;
    const { onImageStateUpdate } = this.props;
    const newImageState = images.filter(image => (
      image.elemId !== id
    ));
    this.setState({ images: newImageState }, () => {
      onImageStateUpdate(newImageState);
    });
    // API call to actually delete the images from the server
    fetch(`http://localhost:3005/api/deleteImageWithPath/${path}`, {
      method: 'DELETE',
    })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { images } = this.state;
    const { name } = this.props;
    const imageCount = images.length;

    return (
      <Fragment>
        <ImageUpload onDone={this.onImageUpload} imageCount={imageCount} />
        {images.map((image, i) => {
          if (image) {
            return (
              <div className="form-image-wrapper" key={image.elemId}>
                <img
                  className="recipe-form-image"
                  src={`http://localhost:3005/static/userImages/${image.imagePath}`}
                  alt={`${name}-${i}`}
                />
                <input
                  className="close-image-button"
                  type="button"
                  data={image.elemId}
                  onClick={() => { this.onImageDelete(image.elemId, image.imagePath); }}
                  value="Remove this image"
                />
              </div>
            );
          }
          return null;
        })}
      </Fragment>
    );
  }
}

RecipeImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    imagePath: PropTypes.string,
    elemId: PropTypes.number,
  })),
  name: PropTypes.string,
  onImageStateUpdate: PropTypes.func.isRequired,
};

RecipeImages.defaultProps = {
  images: [],
  name: '',
};

export default RecipeImages;
