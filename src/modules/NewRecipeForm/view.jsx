import React, { Fragment } from 'react';
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

const messages = {
  buttonAction: "Add this recipe!",
  failMessage: `Oops! There was an error adding your recipe. 
    Please try again!`,
  successMessage: "The recipe was added successfully!",
}

const NewRecipeForm = () => (
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
      messages={messages}
    />
  </Fragment>
);

export default NewRecipeForm;
