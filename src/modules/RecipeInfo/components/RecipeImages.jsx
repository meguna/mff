import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeImages = ({ images, name }) => (
  <Fragment>
    {images.length !== 0 && <p className="recipe-info-label">Images</p>}
    {images.map((image) => {
      if (image) {
        return (
          <div className="form-image-wrapper" key={image.elemId}>
            <img
              className="recipe-form-image"
              src={`http://localhost:3005/static/userImages/${image.imagePath}`}
              alt={name}
            />
          </div>
        );
      }
      return null;
    })}
  </Fragment>
);


RecipeImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    imagePath: PropTypes.string,
    elemId: PropTypes.number,
  })),
  name: PropTypes.string,
};

RecipeImages.defaultProps = {
  images: [],
  name: '',
};

export default RecipeImages;
