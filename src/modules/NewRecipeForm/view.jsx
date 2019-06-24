import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';

const recipeInfo = {
  name: '',
  size: '',
  ingredients: [[{ ...ING_FIELD_BLANK }]],
  groups: [{ ...ING_GROUP_BLANK }],
  notes: '',
  invalid: { name: false, ingCount: false },
  images: [],
};

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <RecipeForm
          initialFormState={recipeInfo}
          initialIngredients={recipeInfo.ingredients}
          title="Add A New Recipe"
          initialGroups={recipeInfo.groups}
          notes=""
          name=""
          size=""
          fetchUrl="http://localhost:3005/api/createnewrecipe"
        />
      </Fragment>
    );
  }
}

NewRecipeForm.propTypes = {
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
};

NewRecipeForm.defaultProps = {
  fetchRecipes: () => {},
  sortMethod: 'update_date',
};

export default NewRecipeForm;
