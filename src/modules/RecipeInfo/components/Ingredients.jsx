import React from 'react';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {
  let amount = [ingredient.amount];
  if (ingredient.amount) {
    let amountArray = ingredient.amount.split(/~~(\w+)~~/);
    if (amountArray.length > 1) {
      amountArray = amountArray.map((str, i) => {
        if (i % 2 === 1) {
          return <span key={i} className="strikethrough">{str}</span>;
        }
        return str;
      });
      amount = amountArray;
    }
  }

  return (
    <p key={ingredient.id} className="recipe-info-ingredients-item">
      {ingredient.name}
      {ingredient.amount && (
        <span>
          &nbsp;
          &mdash;
          &nbsp;
          {amount}
          &nbsp;
          {ingredient.amount_unit}
        </span>
      )}
      <span className="recipe-info-ingredient-note">
        {ingredient.notes}
      </span>
    </p>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    notes: PropTypes.string,
    groupId: PropTypes.number,
  }),
};

Ingredient.defaultProps = {
  ingredient: {
    name: '',
    amount: '',
    notes: '',
    groupId: 0,
  },
};

export default Ingredient;
