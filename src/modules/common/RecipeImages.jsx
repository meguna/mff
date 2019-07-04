import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class RecipeImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesLoaded: [],
    };
  }

  componentDidMount() {
    const { images } = this.props;

    images.forEach((image) => {
      import(`../../../static/userImages/${image.image_path}`)
        .then((importedImage) => {
          this.setState(prevState => ({
            imagesLoaded: [...prevState.imagesLoaded, importedImage],
          }));
        });
    });
  }

  render() {
    const { imagesLoaded } = this.state;
    const { name } = this.props;

    return (
      <Fragment>
        {(imagesLoaded.length !== 0) && (
          <p className="recipe-info-label">images</p>
        )}
        {imagesLoaded.map((image, i) => {
          if (image) {
            return (
              <img
                className="recipe-image"
                key={i}
                src={image.default}
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
  images: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

RecipeImages.defaultProps = {
  images: [],
  name: '',
};

export default RecipeImages;
