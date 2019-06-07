import React from 'react';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => (
  <p key={ingredient.id} className="recipe-info-ingredients-item">
    {ingredient.name}
    &mdash;
    {ingredient.amount}
    &nbsp;
    {ingredient.amount_unit}
    <span className="recipe-info-ingredient-note">
      {ingredient.notes}
    </span>
  </p>
);

Ingredient.propTypes = {
  ingredient: PropTypes.object,
};

Ingredient.defaultProps = {
  ingredient: {},
};

export default Ingredient;
