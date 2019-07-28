import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';

class NewRecipeForm extends Component {
  componentDidMount() {
    const { setSelectedRecipe } = this.props;
    /* This function is required for the form request to go through properly.
     * Invariant: maintain selected recipe ID always. When none applicable,
     * use -1.
     */
    setSelectedRecipe(-1);
  }

  render() {
    const recipeInfo = {
      name: '',
      size: '',
      ingredients: [[{ ...ING_FIELD_BLANK }]],
      groups: [{ ...ING_GROUP_BLANK }],
      notes: '',
      invalid: { name: false, ingCount: false },
      images: [],
    };

    const messages = {
      buttonAction: 'Add this recipe!',
      failMessage: `Oops! There was an error adding your recipe. 
        Please try again!`,
      successMessage: 'The recipe was added successfully!',
    };

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
          fetchUrl="/createnewrecipe"
          messages={messages}
        />
      </Fragment>
    );
  }
}

NewRecipeForm.propTypes = {
  setSelectedRecipe: PropTypes.func.isRequired,
};

export default NewRecipeForm;
