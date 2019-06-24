import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredients';

const groupLetterLabel = (int, groupCount) => {
  if (groupCount > 1) {
    return (
      <span className="recipe-info-group-letter-label">
        {String.fromCharCode(65 + int)}
      </span>
    );
  }
  return null;
};

const IngredientGroup = ({ ingredients, groups, groupCount }) => {
  const ingredientGroups = [];
  for (let i = 1; i < groupCount + 1; i++) {
    ingredientGroups.push(ingredients.filter(item => item.groupId === i));
  }
  return (
    <Fragment>
      {ingredients.length !== 0 && <p className="recipe-info-label">ingredients</p>}
      <div className="recipe-info-ing-list">
        {ingredientGroups.map((group, i) => (
          <div className="recipe-info-ing-list-group" key={groups[i].groupId}>
            {groups[i].notes && (
              <p className="recipe-info-group-note">
                {groups[i].notes}
              </p>
            )}
            {groupLetterLabel(i, groupCount)}
            <div className="recipe-info-ing-item-parent">
              {group.map((ingredient, j) => (
                <Ingredient ingredient={ingredient} key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  groupCount: PropTypes.number,
};

IngredientGroup.defaultProps = {
  ingredients: [],
  groups: [{}],
  groupCount: null,
};

export default IngredientGroup;
