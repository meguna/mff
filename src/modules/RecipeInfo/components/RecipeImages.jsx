import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RecipeImages = ({ images, name, screen }) => {
  const { t } = useTranslation();
  const mobileClass = (screen === 'mobile') ? 'ri-image-mobile' : '';
  return (
    <Fragment>
      {images.length !== 0 && (
        <p className="recipe-info-label">
          {t('common:recipe.images')}
        </p>
      )}
      {images.map((image) => {
        if (image) {
          return (
            <div className="form-image-wrapper" key={image.elemId}>
              <img
                className={`ri-image-mobile ${mobileClass}`}
                src={`http://localhost:3005/static/${image.imagePath}`}
                alt={name}
              />
            </div>
          );
        }
        return null;
      })}
    </Fragment>
  );
};


RecipeImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    imagePath: PropTypes.string,
    elemId: PropTypes.number,
  })),
  name: PropTypes.string,
  screen: PropTypes.string.isRequired,
};

RecipeImages.defaultProps = {
  images: [],
  name: '',
};

export default RecipeImages;
