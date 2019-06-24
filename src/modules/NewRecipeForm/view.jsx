import React, { Fragment } from 'react';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';

const NewRecipeForm = () => {
  const recipeInfo = {
    name: '',
    size: '',
    ingredients: [[{ ...ING_FIELD_BLANK }]],
    groups: [{ ...ING_GROUP_BLANK }],
    notes: '',
    invalid: { name: false, ingCount: false },
    submitError: false,
    submitStatus: '',
    images: [],
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
      />
    </Fragment>
  );
};

export default NewRecipeForm;
