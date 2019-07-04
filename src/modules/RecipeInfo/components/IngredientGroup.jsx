import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredients';

const IngredientGroup = ({ ingredients, groups, groupCount }) => {
  /**
   * From a 1D array of ingredient objects, form a 2D array with each the
   * ingredients grouped by groupId
   */
  const ingredientGroups = [];
  for (let i = 1; i < groupCount + 1; i++) {
    ingredientGroups.push(ingredients.filter(item => item.groupId === i));
  }
  let dottedBorderClass = '';
  if (ingredients.length !== 0 && groupCount > 1) {
    dottedBorderClass = 'recipe-info-ing-list-group';
  }

  console.log(ingredients);

  return (
    <Fragment>
      <p className="recipe-info-label">ingredients</p>
      {ingredients.length === 0 && (
        <p className="form-description">
          Looks like this recipe doesn&apos;t have any ingredients yet.
          <br />
          Use the Edit Recipe button to add some!
        </p>
      )}
      <div className="recipe-info-ing-list">
        {ingredientGroups.map((group, i) => (
          <div className="recipe-group-wrapper" key={groups[i].groupId}>
            <div className={dottedBorderClass}>
              <div className="recipe-info-ing-item-parent">
                {group.map((ingredient, j) => (
                  <Ingredient ingredient={ingredient} key={j} />
                ))}
              </div>
            </div>
            {(groups[i].notes || groups[i].name) && (
              <div className="recipe-group-info-box">
                {groups[i].name && (
                  <p className="recipe-info-group-name">
                    {groups[i].name}
                  </p>
                )}
                {groups[i].notes && (
                  <p className="recipe-info-group-note">
                    {groups[i].notes}
                  </p>
                )}
              </div>
            )}
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
