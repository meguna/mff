import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from './ImageUpload';

class RecipeImages extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { images } = this.props;
    this.state = {
      images,
    };
  }

  render() {
    const { images } = this.state;
    const { name, onDone } = this.props;
    console.log(this.props.images);

    return (
      <Fragment>
        <ImageUpload onDone={onDone} />
        {(images.length !== 0) && (
          <p className="recipe-info-label">images</p>
        )}
        {images.map((image, i) => {
          if (image) {
            return (
              <img
                className="recipe-image"
                key={i}
                src={`http://localhost:3005/static/userImages/${image.image_path}`}
                alt={`${name}-${i}`}
              />
            );
          }
          return null;
        })}
      </Fragment>
    );
  }
}

RecipeImages.propTypes = {
  // images: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

RecipeImages.defaultProps = {
  // images: [{}],
  name: '',
};

export default RecipeImages;
