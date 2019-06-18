import React from 'react';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => (
  <p key={ingredient.id} className="recipe-info-ingredients-item">
    {ingredient.name}
    &nbsp;
    &mdash;
    &nbsp;
    {ingredient.amount}
    &nbsp;
    {ingredient.amount_unit}
    <span className="recipe-info-ingredient-note">
      {ingredient.notes}
    </span>
  </p>
);

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    recipe_id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.string,
    amount_unit: PropTypes.string,
    order: PropTypes.number,
    notes: PropTypes.string,
    group_id: PropTypes.number,
  }),
};

Ingredient.defaultProps = {
  ingredient: {
    id: 0,
    recipe_id: 0,
    name: '',
    amount: '',
    amount_unit: '',
    order: 0,
    notes: '',
    group_id: 0,
  },
};

export default Ingredient;
