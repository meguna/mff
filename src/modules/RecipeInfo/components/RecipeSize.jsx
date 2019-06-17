import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeSize = ({ size }) => (
  <Fragment>
    <p className="recipe-info-serves">{size}</p>
  </Fragment>
);

RecipeSize.propTypes = {
  size: PropTypes.string,
};

RecipeSize.defaultProps = {
  size: '',
};

export default React.memo(RecipeSize);
